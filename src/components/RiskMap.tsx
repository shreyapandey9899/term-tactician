import { useState, useCallback } from 'react';
import {
  ReactFlow,
  MiniMap,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
  addEdge,
  Node,
  Edge,
  Connection,
  Handle,
  Position,
} from 'reactflow';
import 'reactflow/dist/style.css';
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { X, AlertTriangle, Shield, CheckCircle, Users, FileText } from "lucide-react";

// Custom node component for risk nodes
const RiskNode = ({ data }: { data: any }) => {
  const getRiskColor = (risk: string) => {
    switch (risk) {
      case 'safe': return 'gradient-trust';
      case 'warning': return 'gradient-warning';  
      case 'danger': return 'gradient-danger';
      default: return 'gradient-primary';
    }
  };

  const getRiskIcon = (risk: string) => {
    switch (risk) {
      case 'safe': return <CheckCircle className="w-4 h-4 text-white" />;
      case 'warning': return <AlertTriangle className="w-4 h-4 text-white" />;
      case 'danger': return <Shield className="w-4 h-4 text-white" />;
      default: return <FileText className="w-4 h-4 text-white" />;
    }
  };

  return (
    <div className={`px-4 py-3 shadow-feature rounded-lg border border-border/50 bg-card/90 backdrop-blur-sm min-w-[160px] cursor-pointer hover:shadow-hero transition-smooth ${getRiskColor(data.risk)}`}>
      <Handle type="target" position={Position.Top} className="w-2 h-2" />
      <div className="flex items-center gap-2 text-white">
        {getRiskIcon(data.risk)}
        <div>
          <div className="font-semibold text-sm">{data.label}</div>
          {data.subtitle && <div className="text-xs opacity-90">{data.subtitle}</div>}
        </div>
      </div>
      <Handle type="source" position={Position.Bottom} className="w-2 h-2" />
    </div>
  );
};

// Entity node for parties involved
const EntityNode = ({ data }: { data: any }) => {
  return (
    <div className="px-4 py-3 shadow-feature rounded-lg border border-primary/30 bg-primary/10 backdrop-blur-sm min-w-[140px] cursor-pointer hover:shadow-hero transition-smooth">
      <Handle type="target" position={Position.Top} className="w-2 h-2" />
      <div className="flex items-center gap-2 text-foreground">
        <Users className="w-4 h-4 text-primary" />
        <div>
          <div className="font-semibold text-sm">{data.label}</div>
          <div className="text-xs text-muted-foreground">{data.role}</div>
        </div>
      </div>
      <Handle type="source" position={Position.Bottom} className="w-2 h-2" />
    </div>
  );
};

const nodeTypes = {
  riskNode: RiskNode,
  entityNode: EntityNode,
};

// Mock contract data
const initialNodes: Node[] = [
  // Entities
  {
    id: '1',
    type: 'entityNode',
    position: { x: 250, y: 50 },
    data: { label: 'Tenant', role: 'Party A' },
  },
  {
    id: '2', 
    type: 'entityNode',
    position: { x: 450, y: 50 },
    data: { label: 'Landlord', role: 'Party B' },
  },
  
  // Contract clauses with risk levels
  {
    id: '3',
    type: 'riskNode',
    position: { x: 100, y: 200 },
    data: { 
      label: 'Payment Terms', 
      subtitle: 'Monthly Rent',
      risk: 'safe',
      explanation: 'Standard monthly payment of ₹25,000 due by 5th of each month. This is a fair and reasonable clause.',
      originalText: 'The Tenant shall pay monthly rent of INR 25,000 on or before the 5th day of each calendar month.'
    },
  },
  {
    id: '4',
    type: 'riskNode',
    position: { x: 300, y: 200 },
    data: { 
      label: 'Security Deposit',
      subtitle: '4 Months Advance',
      risk: 'danger',
      explanation: 'Demanding 4 months as security deposit exceeds the legal limit of 2 months under Delhi Rent Control Act. This clause is potentially unenforceable.',
      originalText: 'Tenant must provide security deposit equivalent to four (4) months rent in advance.'
    },
  },
  {
    id: '5',
    type: 'riskNode', 
    position: { x: 500, y: 200 },
    data: { 
      label: 'Maintenance',
      subtitle: 'Shared Responsibility',
      risk: 'warning',
      explanation: 'Clause requires tenant to pay for major repairs typically covered by landlord. Consider negotiating a cap on tenant maintenance costs.',
      originalText: 'All maintenance and repairs, including structural issues, shall be borne by the Tenant.'
    },
  },
  {
    id: '6',
    type: 'riskNode',
    position: { x: 200, y: 350 },
    data: { 
      label: 'Termination Notice',
      subtitle: '30 Days',
      risk: 'safe',
      explanation: 'Standard 30-day notice period for termination. This provides reasonable time for both parties.',
      originalText: 'Either party may terminate this agreement by providing thirty (30) days written notice.'
    },
  },
  {
    id: '7',
    type: 'riskNode',
    position: { x: 400, y: 350 },
    data: { 
      label: 'Early Termination',
      subtitle: 'Penalty Clause',
      risk: 'warning',
      explanation: 'Early termination penalty of 2 months rent is high. Standard practice is 1 month. Consider negotiating this down.',
      originalText: 'In case of early termination by Tenant, a penalty equivalent to two months rent shall apply.'
    },
  },
];

const initialEdges: Edge[] = [
  { id: 'e1-3', source: '1', target: '3', type: 'smoothstep' },
  { id: 'e1-4', source: '1', target: '4', type: 'smoothstep' },
  { id: 'e2-4', source: '2', target: '4', type: 'smoothstep' },
  { id: 'e2-5', source: '2', target: '5', type: 'smoothstep' },
  { id: 'e3-6', source: '3', target: '6', type: 'smoothstep' },
  { id: 'e4-7', source: '4', target: '7', type: 'smoothstep' },
];

interface RiskMapProps {
  onClose: () => void;
}

const RiskMap = ({ onClose }: RiskMapProps) => {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const [selectedNode, setSelectedNode] = useState<Node | null>(null);

  const onConnect = useCallback(
    (params: Edge | Connection) => setEdges((eds) => addEdge(params, eds)),
    [setEdges],
  );

  const onNodeClick = useCallback((_: React.MouseEvent, node: Node) => {
    setSelectedNode(node);
  }, []);

  return (
    <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-7xl h-[90vh] bg-card/95 backdrop-blur-sm border-border shadow-hero">
        <div className="p-6 border-b border-border flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-foreground">Interactive Risk Map</h2>
            <p className="text-muted-foreground">Click any clause to see detailed analysis</p>
          </div>
          <Button variant="outline" size="icon" onClick={onClose}>
            <X className="w-4 h-4" />
          </Button>
        </div>
        
        <div className="flex h-[calc(90vh-100px)]">
          <div className="flex-1 relative">
            <ReactFlow
              nodes={nodes}
              edges={edges}
              onNodesChange={onNodesChange}
              onEdgesChange={onEdgesChange}
              onConnect={onConnect}
              onNodeClick={onNodeClick}
              nodeTypes={nodeTypes}
              className="bg-gradient-to-br from-muted/30 to-background"
            >
              <Controls />
              <MiniMap className="bg-card/80 backdrop-blur-sm border border-border rounded-lg" />
              <Background variant={'dots' as any} gap={12} size={1} />
            </ReactFlow>
          </div>
          
          {selectedNode && (
            <div className="w-96 border-l border-border bg-card/50 backdrop-blur-sm p-6 overflow-y-auto">
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  {selectedNode.data.risk === 'safe' && <CheckCircle className="w-6 h-6 text-green-600" />}
                  {selectedNode.data.risk === 'warning' && <AlertTriangle className="w-6 h-6 text-amber-600" />}
                  {selectedNode.data.risk === 'danger' && <Shield className="w-6 h-6 text-red-600" />}
                  <h3 className="text-xl font-bold text-foreground">{selectedNode.data.label}</h3>
                </div>
                
                {selectedNode.data.explanation && (
                  <div className="space-y-3">
                    <div>
                      <h4 className="font-semibold text-foreground mb-2">AI Analysis</h4>
                      <p className="text-muted-foreground text-sm leading-relaxed">
                        {selectedNode.data.explanation}
                      </p>
                    </div>
                    
                    <div>
                      <h4 className="font-semibold text-foreground mb-2">Original Text</h4>
                      <div className="p-3 rounded-lg bg-muted/50 border border-border">
                        <p className="text-sm italic text-muted-foreground">
                          "{selectedNode.data.originalText}"
                        </p>
                      </div>
                    </div>
                  </div>
                )}
                
                <div className="flex gap-2 pt-4">
                  <Button variant="outline" size="sm" className="flex-1">
                    Suggest Changes
                  </Button>
                  <Button variant="outline" size="sm" className="flex-1">
                    Flag for Review
                  </Button>
                </div>
              </div>
            </div>
          )}
        </div>
        
        <div className="p-4 border-t border-border bg-muted/30">
          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded gradient-trust"></div>
                <span className="text-muted-foreground">Safe Terms</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded gradient-warning"></div>
                <span className="text-muted-foreground">Review Needed</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded gradient-danger"></div>
                <span className="text-muted-foreground">High Risk</span>
              </div>
            </div>
            <span className="text-muted-foreground">Rental Agreement Analysis • Delhi Jurisdiction</span>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default RiskMap;