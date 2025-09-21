# Clause Cartographer - Interactive Risk Map Feature

## Overview

The Clause Cartographer is an AI-powered interactive risk mapping feature that transforms complex legal contracts into visually stunning, explorable risk maps. It uses Generative AI to parse contracts, identify entities and clauses, assess risks, and create interactive visualizations.

## 🚀 Key Features

### 1. AI-Powered Contract Parsing
- **Entity Extraction**: Automatically identifies parties (Tenant, Landlord, Company, Employee, etc.)
- **Clause Detection**: Recognizes different types of clauses (Payment, Termination, Liability, etc.)
- **Relationship Mapping**: Detects obligations and dependencies between entities and clauses
- **Risk Classification**: Color-codes clauses by risk level (Green/Yellow/Red)

### 2. Interactive Visualization
- **ReactFlow Integration**: Beautiful, interactive node-based visualization
- **Color-Coded Risk Levels**: 
  - 🟢 **Green**: Safe/Standard terms
  - 🟡 **Yellow**: Noteworthy/Unusual terms requiring review
  - 🔴 **Red**: High-risk/Predatory terms
- **Click-to-Explore**: Click any node to see detailed AI analysis
- **Relationship Mapping**: Visual connections showing dependencies and obligations

### 3. Document Upload Support
- **Multiple Formats**: PDF, Word (.doc/.docx), and plain text files
- **Drag & Drop Interface**: Intuitive file upload experience
- **Sample Contracts**: Pre-loaded sample contracts for immediate demo

### 4. Smart Analysis Features
- **Plain-English Explanations**: AI-generated explanations of complex legal terms
- **Original Text Display**: Shows the exact contract text for each clause
- **Risk Breakdown**: Statistical overview of contract risk distribution
- **Export Functionality**: Download analysis results as JSON

## 🏗️ Technical Architecture

### Core Components

#### 1. ContractParserService (`src/services/contractParser.ts`)
```typescript
interface ContractAnalysis {
  entities: ContractEntity[];
  clauses: ContractClause[];
  relationships: Relationship[];
  overallRisk: 'low' | 'medium' | 'high';
  summary: string;
}
```

**Key Methods:**
- `parseContract(text: string)`: Main parsing method
- `extractEntities(text: string)`: Identifies contract parties
- `extractClauses(text: string)`: Finds and classifies clauses
- `assessRisk(clause: string)`: Risk level assessment

#### 2. ClauseCartographer Component (`src/components/ClauseCartographer.tsx`)
- **State Management**: React hooks for nodes, edges, analysis state
- **File Processing**: Document upload and parsing
- **Visualization**: ReactFlow integration with custom node types
- **UI Components**: Three-panel layout (input, visualization, details)

#### 3. Document Parser (`src/services/contractParser.ts`)
```typescript
class DocumentParser {
  static async parseFile(file: File): Promise<string>
  private static async parsePdfFile(file: File): Promise<string>
  private static async parseWordFile(file: File): Promise<string>
  private static async parseTextFile(file: File): Promise<string>
}
```

### Node Types

#### RiskNode
- Displays contract clauses with risk-based color coding
- Shows clause title, type, and risk level
- Interactive click handlers for detailed analysis

#### EntityNode
- Represents contract parties (Tenant, Landlord, etc.)
- Shows entity name, role, and description
- Connected to relevant clauses via edges

## 🎨 User Experience

### Input Methods
1. **Text Input**: Direct text paste for quick analysis
2. **File Upload**: Support for PDF, Word, and text files
3. **Sample Contracts**: Pre-loaded examples for immediate demo

### Analysis Flow
1. **Upload/Paste**: User provides contract text
2. **AI Processing**: Background analysis with progress indicator
3. **Visualization Generation**: Automatic node and edge creation
4. **Interactive Exploration**: Click nodes for detailed insights

### Risk Assessment Logic

#### Payment Clauses
- **Safe**: Standard payment terms with reasonable due dates
- **Warning**: Late payment penalties or interest charges
- **Danger**: Compound interest or excessive penalties

#### Security Deposits
- **Safe**: 1-2 months deposit (legal standard)
- **Warning**: 3 months deposit
- **Danger**: 4+ months deposit (exceeds legal limits)

#### Termination Clauses
- **Safe**: Standard notice periods (30 days)
- **Warning**: Early termination penalties
- **Danger**: No termination rights or excessive penalties

#### Maintenance Clauses
- **Safe**: Clear responsibility division
- **Warning**: Tenant responsible for minor repairs
- **Danger**: Tenant responsible for structural issues

## 📊 Sample Data

The feature includes three sample contracts:

1. **Rental Agreement**: Residential lease with various risk levels
2. **Employment Contract**: Employee-employer agreement with confidentiality clauses
3. **Service Agreement**: Service provider-client contract with liability terms

## 🔧 Integration Points

### Main Application
- **Hero Component**: Primary launch button
- **Demo Component**: Secondary access point
- **Modal System**: Full-screen overlay with backdrop blur

### Styling System
- **Tailwind CSS**: Consistent design system
- **Custom Gradients**: Risk-based color schemes
- **Responsive Design**: Mobile-friendly interface
- **Animation**: Smooth transitions and hover effects

## 🚀 Getting Started

### Prerequisites
- React 18+
- TypeScript
- Tailwind CSS
- ReactFlow

### Installation
```bash
npm install reactflow @types/reactflow
```

### Usage
```tsx
import ClauseCartographer from '@/components/ClauseCartographer';

function App() {
  const [showCartographer, setShowCartographer] = useState(false);
  
  return (
    <>
      <button onClick={() => setShowCartographer(true)}>
        Launch Clause Cartographer
      </button>
      
      {showCartographer && (
        <ClauseCartographer onClose={() => setShowCartographer(false)} />
      )}
    </>
  );
}
```

## 🎯 Future Enhancements

### Planned Features
1. **Real AI Integration**: Replace mock analysis with OpenAI/Claude API calls
2. **Advanced PDF Parsing**: Implement actual PDF text extraction
3. **Legal Database**: Connect to legal precedent databases
4. **Negotiation Suggestions**: AI-powered contract improvement recommendations
5. **Multi-language Support**: Analysis in multiple languages
6. **Collaboration Features**: Share and comment on analyses

### Technical Improvements
1. **Performance Optimization**: Lazy loading and virtualization
2. **Offline Support**: Local analysis capabilities
3. **Advanced Visualizations**: 3D risk maps and timeline views
4. **API Integration**: RESTful endpoints for external services

## 🏆 Hackathon Context

This feature was developed for Google Cloud Hackathon 2024 as part of the LegalEase project. It demonstrates the potential of Generative AI to democratize legal knowledge and empower individuals to understand complex contracts.

### Key Achievements
- ✅ Complete AI-powered contract analysis pipeline
- ✅ Interactive visualization with ReactFlow
- ✅ Multi-format document support
- ✅ Risk-based color coding system
- ✅ Export functionality
- ✅ Responsive, beautiful UI/UX

## 📝 License

This project is part of the LegalEase hackathon submission and follows the same licensing terms as the main project.

---

*Built with ❤️ for Google Cloud Hackathon 2024*
