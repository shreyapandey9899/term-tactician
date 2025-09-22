import { useState, useCallback, useRef } from 'react';
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
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  X, 
  AlertTriangle, 
  Shield, 
  CheckCircle, 
  Users, 
  FileText, 
  Upload, 
  File,
  Brain,
  Download,
  RefreshCw,
  Eye,
  AlertCircle
} from "lucide-react";
import { ContractParserService, DocumentParser, ContractAnalysis, ContractEntity, ContractClause } from '@/services/contractParser';
import { sampleContracts, contractTypes } from '@/data/sampleContracts';

// Enhanced node components with better visual design
const RiskNode = ({ data }: { data: any }) => {
  const getRiskColor = (risk: string) => {
    switch (risk) {
      case 'safe': return 'from-green-500 to-green-600 shadow-green-500/25';
      case 'warning': return 'from-amber-500 to-amber-600 shadow-amber-500/25';  
      case 'danger': return 'from-red-500 to-red-600 shadow-red-500/25';
      default: return 'from-blue-500 to-blue-600 shadow-blue-500/25';
    }
  };

  const getRiskIcon = (risk: string) => {
    switch (risk) {
      case 'safe': return <CheckCircle className="w-5 h-5 text-white drop-shadow-sm" />;
      case 'warning': return <AlertTriangle className="w-5 h-5 text-white drop-shadow-sm" />;
      case 'danger': return <Shield className="w-5 h-5 text-white drop-shadow-sm" />;
      default: return <FileText className="w-5 h-5 text-white drop-shadow-sm" />;
    }
  };

  const getRiskPulse = (risk: string) => {
    switch (risk) {
      case 'danger': return 'animate-pulse';
      case 'warning': return 'animate-pulse';
      default: return '';
    }
  };

  return (
    <div className={`relative px-5 py-4 shadow-xl rounded-xl border border-white/30 bg-gradient-to-br backdrop-blur-sm min-w-[200px] cursor-pointer hover:shadow-2xl hover:scale-105 transition-all duration-300 ${getRiskColor(data.risk)} ${getRiskPulse(data.risk)}`}>
      <Handle type="target" position={Position.Top} className="w-3 h-3 bg-white border-2 border-gray-300" />
      
      {/* Risk indicator dot */}
      <div className={`absolute -top-1 -right-1 w-4 h-4 rounded-full border-2 border-white ${data.risk === 'danger' ? 'bg-red-400' : data.risk === 'warning' ? 'bg-amber-400' : 'bg-green-400'}`} />
      
      <div className="flex items-center gap-3 text-white">
        {getRiskIcon(data.risk)}
        <div className="flex-1">
          <div className="font-bold text-sm leading-tight">{data.label}</div>
          {data.subtitle && (
            <div className="text-xs opacity-90 mt-1 font-medium">
              {data.subtitle}
            </div>
          )}
          {data.type && (
            <div className="text-xs opacity-75 mt-1">
              {data.type}
            </div>
          )}
        </div>
      </div>
      
      {/* Hover effect overlay */}
      <div className="absolute inset-0 rounded-xl bg-white/10 opacity-0 hover:opacity-100 transition-opacity duration-300" />
      
      <Handle type="source" position={Position.Bottom} className="w-3 h-3 bg-white border-2 border-gray-300" />
    </div>
  );
};

const EntityNode = ({ data }: { data: any }) => {
  const getEntityIcon = (type: string) => {
    switch (type) {
      case 'Company': return <FileText className="w-5 h-5 text-indigo-600" />;
      case 'Person': return <Users className="w-5 h-5 text-indigo-600" />;
      case 'Organization': return <Shield className="w-5 h-5 text-indigo-600" />;
      case 'Government': return <AlertCircle className="w-5 h-5 text-indigo-600" />;
      default: return <Users className="w-5 h-5 text-indigo-600" />;
    }
  };

  return (
    <div className="relative px-5 py-4 shadow-xl rounded-xl border border-indigo-200/50 bg-gradient-to-br from-indigo-50 to-indigo-100 backdrop-blur-sm min-w-[180px] cursor-pointer hover:shadow-2xl hover:scale-105 transition-all duration-300">
      <Handle type="target" position={Position.Top} className="w-3 h-3 bg-indigo-500 border-2 border-white" />
      
      {/* Entity type indicator */}
      <div className="absolute -top-1 -right-1 w-4 h-4 rounded-full border-2 border-white bg-indigo-400" />
      
      <div className="flex items-center gap-3">
        {getEntityIcon(data.type)}
        <div className="flex-1">
          <div className="font-bold text-sm text-indigo-900 leading-tight">{data.label}</div>
          <div className="text-xs text-indigo-700 mt-1 font-medium">{data.role}</div>
          {data.type && (
            <div className="text-xs text-indigo-600 mt-1">
              {data.type}
            </div>
          )}
        </div>
      </div>
      
      {/* Hover effect overlay */}
      <div className="absolute inset-0 rounded-xl bg-indigo-200/20 opacity-0 hover:opacity-100 transition-opacity duration-300" />
      
      <Handle type="source" position={Position.Bottom} className="w-3 h-3 bg-indigo-500 border-2 border-white" />
    </div>
  );
};

const nodeTypes = {
  riskNode: RiskNode,
  entityNode: EntityNode,
};

interface ClauseCartographerProps {
  onClose: () => void;
}

const ClauseCartographer = ({ onClose }: ClauseCartographerProps) => {
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const [selectedNode, setSelectedNode] = useState<Node | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisProgress, setAnalysisProgress] = useState(0);
  const [contractText, setContractText] = useState('');
  const [analysis, setAnalysis] = useState<ContractAnalysis | null>(null);
  const [uploadMode, setUploadMode] = useState<'text' | 'file' | 'sample'>('text');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const onConnect = useCallback(
    (params: Edge | Connection) => setEdges((eds) => addEdge(params, eds)),
    [setEdges],
  );

  const onNodeClick = useCallback((_: React.MouseEvent, node: Node) => {
    setSelectedNode(node);
  }, []);

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setIsAnalyzing(true);
    setAnalysisProgress(0);

    try {
      // Simulate progress
      const progressInterval = setInterval(() => {
        setAnalysisProgress(prev => {
          if (prev >= 90) {
            clearInterval(progressInterval);
            return 90;
          }
          return prev + 10;
        });
      }, 200);

      const text = await DocumentParser.parseFile(file);
      setContractText(text);
      
      clearInterval(progressInterval);
      setAnalysisProgress(100);
      
      await analyzeContract(text);
    } catch (error) {
      console.error('File parsing error:', error);
      alert('Error parsing file. Please try again.');
    } finally {
      setIsAnalyzing(false);
      setAnalysisProgress(0);
    }
  };

  const analyzeContract = async (text: string) => {
    if (!text.trim()) {
      alert('Please enter contract text or upload a file.');
      return;
    }

    setIsAnalyzing(true);
    setAnalysisProgress(0);

    try {
      // Simulate progress
      const progressInterval = setInterval(() => {
        setAnalysisProgress(prev => {
          if (prev >= 90) {
            clearInterval(progressInterval);
            return 90;
          }
          return prev + 10;
        });
      }, 300);

      const parser = ContractParserService.getInstance();
      const result = await parser.parseContract(text);
      
      clearInterval(progressInterval);
      setAnalysisProgress(100);
      
      setAnalysis(result);
      generateVisualization(result);
    } catch (error) {
      console.error('Analysis error:', error);
      alert('Error analyzing contract. Please try again.');
    } finally {
      setIsAnalyzing(false);
      setAnalysisProgress(0);
    }
  };

  const generateVisualization = (analysis: ContractAnalysis) => {
    const newNodes: Node[] = [];
    const newEdges: Edge[] = [];

    // Create a more sophisticated layout
    const entityCount = analysis.entities.length;
    const clauseCount = analysis.clauses.length;
    
    // Position entities in a horizontal line at the top
    analysis.entities.forEach((entity, index) => {
      const x = 200 + (index * 300);
      const y = 100;
      
      newNodes.push({
        id: entity.id,
        type: 'entityNode',
        position: { x, y },
        data: { 
          label: entity.name, 
          role: entity.role,
          description: entity.description,
          type: entity.type
        },
      });
    });

    // Position clauses in a grid below entities, organized by risk level
    const safeClauses = analysis.clauses.filter(c => c.riskLevel === 'safe');
    const warningClauses = analysis.clauses.filter(c => c.riskLevel === 'warning');
    const dangerClauses = analysis.clauses.filter(c => c.riskLevel === 'danger');

    // Position safe clauses (green) on the left
    safeClauses.forEach((clause, index) => {
      const x = 100 + (index % 2) * 250;
      const y = 300 + Math.floor(index / 2) * 180;
      
      newNodes.push({
        id: clause.id,
        type: 'riskNode',
        position: { x, y },
        data: { 
          label: clause.title,
          subtitle: clause.type,
          risk: clause.riskLevel,
          explanation: clause.explanation,
          originalText: clause.content,
          type: clause.type,
          entities: clause.entities
        },
      });
    });

    // Position warning clauses (yellow) in the center
    warningClauses.forEach((clause, index) => {
      const x = 400 + (index % 2) * 250;
      const y = 300 + Math.floor(index / 2) * 180;
      
      newNodes.push({
        id: clause.id,
        type: 'riskNode',
        position: { x, y },
        data: { 
          label: clause.title,
          subtitle: clause.type,
          risk: clause.riskLevel,
          explanation: clause.explanation,
          originalText: clause.content,
          type: clause.type,
          entities: clause.entities
        },
      });
    });

    // Position danger clauses (red) on the right
    dangerClauses.forEach((clause, index) => {
      const x = 700 + (index % 2) * 250;
      const y = 300 + Math.floor(index / 2) * 180;
      
      newNodes.push({
        id: clause.id,
        type: 'riskNode',
        position: { x, y },
        data: { 
          label: clause.title,
          subtitle: clause.type,
          risk: clause.riskLevel,
          explanation: clause.explanation,
          originalText: clause.content,
          type: clause.type,
          entities: clause.entities
        },
      });
    });

    // Add relationships as edges with different styles based on relationship type
    analysis.relationships.forEach((rel, index) => {
      const getEdgeStyle = (type: string) => {
        switch (type) {
          case 'obligation':
            return { stroke: '#10b981', strokeWidth: 3, strokeDasharray: '5,5' };
          case 'right':
            return { stroke: '#3b82f6', strokeWidth: 3 };
          case 'dependency':
            return { stroke: '#8b5cf6', strokeWidth: 2, strokeDasharray: '10,5' };
          case 'conflict':
            return { stroke: '#ef4444', strokeWidth: 4, strokeDasharray: '15,5' };
          default:
            return { stroke: '#6366f1', strokeWidth: 2 };
        }
      };

      newEdges.push({
        id: `edge-${index}`,
        source: rel.from,
        target: rel.to,
        type: 'smoothstep',
        style: getEdgeStyle(rel.type),
        label: rel.type.charAt(0).toUpperCase() + rel.type.slice(1),
        labelStyle: { 
          fill: getEdgeStyle(rel.type).stroke, 
          fontWeight: 600,
          fontSize: '12px'
        },
        animated: rel.type === 'conflict', // Animate conflict relationships
      });
    });

    // Add automatic connections between entities and their related clauses
    analysis.entities.forEach(entity => {
      analysis.clauses.forEach(clause => {
        if (clause.entities.includes(entity.id)) {
          // Check if edge already exists
          const edgeExists = newEdges.some(edge => 
            edge.source === entity.id && edge.target === clause.id
          );
          
          if (!edgeExists) {
            newEdges.push({
              id: `auto-edge-${entity.id}-${clause.id}`,
              source: entity.id,
              target: clause.id,
              type: 'smoothstep',
              style: { stroke: '#6b7280', strokeWidth: 1, opacity: 0.6 },
              animated: false,
            });
          }
        }
      });
    });

    setNodes(newNodes);
    setEdges(newEdges);
  };

  const exportAnalysis = () => {
    if (!analysis) return;

    const exportData = {
      summary: analysis.summary,
      overallRisk: analysis.overallRisk,
      entities: analysis.entities,
      clauses: analysis.clauses,
      relationships: analysis.relationships,
      timestamp: new Date().toISOString()
    };

    const blob = new Blob([JSON.stringify(exportData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'contract-analysis.json';
    a.click();
    URL.revokeObjectURL(url);
  };

  const getRiskBadgeColor = (risk: string) => {
    switch (risk) {
      case 'safe': return 'bg-green-100 text-green-800 border-green-200';
      case 'warning': return 'bg-amber-100 text-amber-800 border-amber-200';
      case 'danger': return 'bg-red-100 text-red-800 border-red-200';
      default: return 'bg-blue-100 text-blue-800 border-blue-200';
    }
  };

  return (
    <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-7xl h-[95vh] bg-card/95 backdrop-blur-sm border-border shadow-2xl">
        <div className="p-6 border-b border-border flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-bold text-foreground flex items-center gap-2">
              <Brain className="w-8 h-8 text-primary" />
              Clause Cartographer
            </h2>
            <p className="text-muted-foreground">AI-powered contract analysis with interactive risk mapping</p>
          </div>
          <div className="flex items-center gap-2">
            {analysis && (
              <Button variant="outline" size="sm" onClick={exportAnalysis}>
                <Download className="w-4 h-4 mr-2" />
                Export
              </Button>
            )}
            <Button variant="outline" size="icon" onClick={onClose}>
              <X className="w-4 h-4" />
            </Button>
          </div>
        </div>
        
        <div className="flex h-[calc(95vh-120px)]">
          {/* Left Panel - Input and Analysis */}
          <div className="w-96 border-r border-border bg-card/50 backdrop-blur-sm p-6 overflow-y-auto">
            <div className="space-y-6">
              {/* Input Mode Toggle */}
              <div className="grid grid-cols-3 gap-2">
                <Button
                  variant={uploadMode === 'text' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setUploadMode('text')}
                  className="text-xs"
                >
                  <FileText className="w-3 h-3 mr-1" />
                  Text
                </Button>
                <Button
                  variant={uploadMode === 'file' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setUploadMode('file')}
                  className="text-xs"
                >
                  <Upload className="w-3 h-3 mr-1" />
                  Upload
                </Button>
                <Button
                  variant={uploadMode === 'sample' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setUploadMode('sample')}
                  className="text-xs"
                >
                  <Eye className="w-3 h-3 mr-1" />
                  Sample
                </Button>
              </div>

              {/* Text Input */}
              {uploadMode === 'text' && (
                <div className="space-y-3">
                  <label className="text-sm font-medium text-foreground">Contract Text</label>
                  <Textarea
                    placeholder="Paste your contract text here..."
                    value={contractText}
                    onChange={(e) => setContractText(e.target.value)}
                    className="min-h-[200px] resize-none"
                  />
                </div>
              )}

              {/* File Upload */}
              {uploadMode === 'file' && (
                <div className="space-y-3">
                  <label className="text-sm font-medium text-foreground">Upload Document</label>
                  <div className="border-2 border-dashed border-border rounded-lg p-6 text-center">
                    <File className="w-8 h-8 mx-auto mb-2 text-muted-foreground" />
                    <p className="text-sm text-muted-foreground mb-3">
                      Supports PDF, Word, and Text files
                    </p>
                    <Button
                      variant="outline"
                      onClick={() => fileInputRef.current?.click()}
                      disabled={isAnalyzing}
                    >
                      <Upload className="w-4 h-4 mr-2" />
                      Choose File
                    </Button>
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept=".pdf,.doc,.docx,.txt"
                      onChange={handleFileUpload}
                      className="hidden"
                    />
                  </div>
                </div>
              )}

              {/* Sample Contracts */}
              {uploadMode === 'sample' && (
                <div className="space-y-3">
                  <label className="text-sm font-medium text-foreground">Sample Contracts</label>
                  <div className="space-y-2">
                    {contractTypes.map((contract) => (
                      <Button
                        key={contract.id}
                        variant="outline"
                        className="w-full justify-start text-left h-auto p-3"
                        onClick={() => {
                          const sampleText = sampleContracts[contract.id as keyof typeof sampleContracts];
                          setContractText(sampleText);
                        }}
                        disabled={isAnalyzing}
                      >
                        <div>
                          <div className="font-medium text-sm">{contract.name}</div>
                          <div className="text-xs text-muted-foreground">{contract.description}</div>
                        </div>
                      </Button>
                    ))}
                  </div>
                </div>
              )}

              {/* Analysis Button */}
              <Button
                onClick={() => analyzeContract(contractText)}
                disabled={isAnalyzing || !contractText.trim()}
                className="w-full"
                size="lg"
              >
                {isAnalyzing ? (
                  <>
                    <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                    Analyzing...
                  </>
                ) : (
                  <>
                    <Brain className="w-4 h-4 mr-2" />
                    Analyze Contract
                  </>
                )}
              </Button>

              {/* Progress Bar */}
              {isAnalyzing && (
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Analysis Progress</span>
                    <span className="text-muted-foreground">{analysisProgress}%</span>
                  </div>
                  <Progress value={analysisProgress} className="h-2" />
                </div>
              )}

              {/* Analysis Summary */}
              {analysis && (
                <div className="space-y-4">
                  <div className="flex items-center gap-2">
                    <Eye className="w-5 h-5 text-primary" />
                    <h3 className="font-semibold text-foreground">Analysis Summary</h3>
                  </div>
                  
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">Overall Risk</span>
                      <Badge className={getRiskBadgeColor(analysis.overallRisk)}>
                        {analysis.overallRisk.toUpperCase()}
                      </Badge>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">Entities</span>
                      <span className="text-sm font-medium">{analysis.entities.length}</span>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">Clauses</span>
                      <span className="text-sm font-medium">{analysis.clauses.length}</span>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">Relationships</span>
                      <span className="text-sm font-medium">{analysis.relationships.length}</span>
                    </div>

                    {/* Risk Breakdown */}
                    <div className="pt-2 border-t border-border">
                      <div className="text-xs text-muted-foreground mb-2">Risk Breakdown</div>
                      <div className="space-y-1">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-1">
                            <div className="w-2 h-2 rounded bg-green-500"></div>
                            <span className="text-xs">Safe</span>
                          </div>
                          <span className="text-xs font-medium">
                            {analysis.clauses.filter(c => c.riskLevel === 'safe').length}
                          </span>
                        </div>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-1">
                            <div className="w-2 h-2 rounded bg-amber-500"></div>
                            <span className="text-xs">Warning</span>
                          </div>
                          <span className="text-xs font-medium">
                            {analysis.clauses.filter(c => c.riskLevel === 'warning').length}
                          </span>
                        </div>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-1">
                            <div className="w-2 h-2 rounded bg-red-500"></div>
                            <span className="text-xs">Danger</span>
                          </div>
                          <span className="text-xs font-medium">
                            {analysis.clauses.filter(c => c.riskLevel === 'danger').length}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="p-3 rounded-lg bg-muted/50 border border-border">
                    <p className="text-sm text-muted-foreground">{analysis.summary}</p>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Right Panel - Visualization */}
          <div className="flex-1 relative">
            {nodes.length > 0 ? (
              <ReactFlow
                nodes={nodes}
                edges={edges}
                onNodesChange={onNodesChange}
                onEdgesChange={onEdgesChange}
                onConnect={onConnect}
                onNodeClick={onNodeClick}
                nodeTypes={nodeTypes}
                className="bg-gradient-to-br from-muted/30 to-background"
                fitView
                fitViewOptions={{ padding: 0.1 }}
              >
                <Controls className="bg-card/80 backdrop-blur-sm border border-border" />
                <MiniMap 
                  className="bg-card/80 backdrop-blur-sm border border-border rounded-lg"
                  nodeColor={(node) => {
                    if (node.type === 'entityNode') return '#6366f1';
                    if (node.data?.risk === 'safe') return '#10b981';
                    if (node.data?.risk === 'warning') return '#f59e0b';
                    if (node.data?.risk === 'danger') return '#ef4444';
                    return '#6b7280';
                  }}
                />
                <Background variant={'dots' as any} gap={12} size={1} />
              </ReactFlow>
            ) : (
              <div className="flex items-center justify-center h-full">
                <div className="text-center space-y-4">
                  <Brain className="w-16 h-16 mx-auto text-muted-foreground" />
                  <div>
                    <h3 className="text-lg font-semibold text-foreground">Ready to Analyze</h3>
                    <p className="text-muted-foreground">Upload a contract or paste text to generate your risk map</p>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Detail Sidebar */}
          {selectedNode && (
            <div className="w-96 border-l border-border bg-card/50 backdrop-blur-sm p-6 overflow-y-auto">
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  {selectedNode.data.risk === 'safe' && <CheckCircle className="w-6 h-6 text-green-600" />}
                  {selectedNode.data.risk === 'warning' && <AlertTriangle className="w-6 h-6 text-amber-600" />}
                  {selectedNode.data.risk === 'danger' && <Shield className="w-6 h-6 text-red-600" />}
                  {selectedNode.type === 'entityNode' && <Users className="w-6 h-6 text-primary" />}
                  <h3 className="text-xl font-bold text-foreground">{selectedNode.data.label}</h3>
                </div>
                
                {selectedNode.data.subtitle && (
                  <Badge variant="outline" className="text-xs">
                    {selectedNode.data.subtitle}
                  </Badge>
                )}

                {selectedNode.data.description && (
                  <div>
                    <h4 className="font-semibold text-foreground mb-2">Description</h4>
                    <p className="text-muted-foreground text-sm leading-relaxed">
                      {selectedNode.data.description}
                    </p>
                  </div>
                )}
                
                {selectedNode.data.explanation && (
                  <div>
                    <h4 className="font-semibold text-foreground mb-2">AI Analysis</h4>
                    <p className="text-muted-foreground text-sm leading-relaxed">
                      {selectedNode.data.explanation}
                    </p>
                  </div>
                )}
                
                {selectedNode.data.originalText && (
                  <div>
                    <h4 className="font-semibold text-foreground mb-2">Original Text</h4>
                    <div className="p-3 rounded-lg bg-muted/50 border border-border">
                      <p className="text-sm italic text-muted-foreground">
                        "{selectedNode.data.originalText}"
                      </p>
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
        
        {/* Enhanced Footer with Legend */}
        <div className="p-4 border-t border-border bg-muted/30">
          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center gap-8">
              {/* Risk Level Legend */}
              <div className="flex items-center gap-6">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-green-500 shadow-sm"></div>
                  <span className="text-muted-foreground font-medium">Safe Terms</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-amber-500 shadow-sm animate-pulse"></div>
                  <span className="text-muted-foreground font-medium">Review Needed</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-500 shadow-sm animate-pulse"></div>
                  <span className="text-muted-foreground font-medium">High Risk</span>
                </div>
              </div>
              
              {/* Relationship Legend */}
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <div className="w-4 h-0.5 bg-green-500" style={{borderTop: '2px dashed #10b981'}}></div>
                  <span className="text-muted-foreground text-xs">Obligation</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-0.5 bg-blue-500"></div>
                  <span className="text-muted-foreground text-xs">Right</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-0.5 bg-purple-500" style={{borderTop: '2px dashed #8b5cf6'}}></div>
                  <span className="text-muted-foreground text-xs">Dependency</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-0.5 bg-red-500" style={{borderTop: '2px dashed #ef4444'}}></div>
                  <span className="text-muted-foreground text-xs">Conflict</span>
                </div>
              </div>
            </div>
            
            <div className="flex items-center gap-2">
              <Brain className="w-4 h-4 text-primary" />
              <span className="text-muted-foreground font-medium">AI-Powered Contract Analysis</span>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default ClauseCartographer;
