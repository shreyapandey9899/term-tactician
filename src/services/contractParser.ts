// AI-powered contract parsing service
export interface ContractEntity {
  id: string;
  name: string;
  type: 'Person' | 'Company' | 'Organization' | 'Government';
  role: string;
  description: string;
}

export interface ContractClause {
  id: string;
  title: string;
  type: 'Payment' | 'Termination' | 'Liability' | 'Confidentiality' | 'Maintenance' | 'Security' | 'Other';
  content: string;
  riskLevel: 'safe' | 'warning' | 'danger';
  explanation: string;
  entities: string[]; // Entity IDs involved
  relatedClauses: string[]; // Related clause IDs
}

export interface ContractAnalysis {
  entities: ContractEntity[];
  clauses: ContractClause[];
  relationships: Array<{
    from: string;
    to: string;
    type: 'obligation' | 'right' | 'dependency' | 'conflict';
    description: string;
  }>;
  overallRisk: 'low' | 'medium' | 'high';
  summary: string;
}

// Mock AI service - in production, this would call OpenAI/Claude API
export class ContractParserService {
  private static instance: ContractParserService;
  
  static getInstance(): ContractParserService {
    if (!ContractParserService.instance) {
      ContractParserService.instance = new ContractParserService();
    }
    return ContractParserService.instance;
  }

  async parseContract(text: string): Promise<ContractAnalysis> {
    // Simulate AI processing delay
    await new Promise(resolve => setTimeout(resolve, 2000));

    // Mock AI analysis - in production, this would be replaced with actual AI calls
    const entities = this.extractEntities(text);
    const clauses = this.extractClauses(text);
    const relationships = this.identifyRelationships(entities, clauses);
    const overallRisk = this.calculateOverallRisk(clauses);

    return {
      entities,
      clauses,
      relationships,
      overallRisk,
      summary: this.generateSummary(entities, clauses, overallRisk)
    };
  }

  private extractEntities(text: string): ContractEntity[] {
    const entities: ContractEntity[] = [];
    const lowerText = text.toLowerCase();

    // Enhanced entity detection patterns
    const entityPatterns = [
      // Rental Agreement entities
      { pattern: /landlord|lessor|owner/i, name: 'Landlord', type: 'Person', role: 'Lessor', description: 'The property owner who rents out the property' },
      { pattern: /tenant|lessee|renter/i, name: 'Tenant', type: 'Person', role: 'Lessee', description: 'The party renting the property' },
      
      // Employment entities
      { pattern: /employer|company|corporation|employing entity/i, name: 'Employer', type: 'Company', role: 'Employer', description: 'The company or organization providing employment' },
      { pattern: /employee|worker|staff member/i, name: 'Employee', type: 'Person', role: 'Employee', description: 'The individual being employed' },
      
      // Service Agreement entities
      { pattern: /service provider|contractor|vendor/i, name: 'Service Provider', type: 'Company', role: 'Provider', description: 'The party providing services' },
      { pattern: /client|customer|buyer/i, name: 'Client', type: 'Company', role: 'Client', description: 'The party receiving services' },
      
      // Additional entities
      { pattern: /property management|management company/i, name: 'Property Management', type: 'Company', role: 'Agent', description: 'Third-party property management service' },
      { pattern: /guarantor|surety/i, name: 'Guarantor', type: 'Person', role: 'Guarantor', description: 'Party providing financial guarantee' },
      { pattern: /agent|representative/i, name: 'Agent', type: 'Person', role: 'Agent', description: 'Authorized representative acting on behalf of a party' }
    ];

    // Extract entities based on patterns
    entityPatterns.forEach(({ pattern, name, type, role, description }) => {
      if (pattern.test(text)) {
        const existingEntity = entities.find(e => e.name === name);
        if (!existingEntity) {
          entities.push({
            id: `entity-${entities.length + 1}`,
            name,
            type: type as 'Person' | 'Company' | 'Organization' | 'Government',
            role,
            description
          });
        }
      }
    });

    // Extract specific names from text (more sophisticated)
    const namePatterns = [
      /(?:between|agreement between)\s+([A-Z][a-zA-Z\s&.,]+?)(?:\s+and|\s+\(|$)/i,
      /(?:landlord:)\s*([A-Z][a-zA-Z\s&.,]+?)(?:\s*\(|$)/i,
      /(?:tenant:)\s*([A-Z][a-zA-Z\s&.,]+?)(?:\s*\(|$)/i,
      /(?:employer:)\s*([A-Z][a-zA-Z\s&.,]+?)(?:\s*\(|$)/i,
      /(?:employee:)\s*([A-Z][a-zA-Z\s&.,]+?)(?:\s*\(|$)/i
    ];

    namePatterns.forEach(pattern => {
      const match = text.match(pattern);
      if (match && match[1]) {
        const extractedName = match[1].trim();
        if (extractedName.length > 2 && extractedName.length < 100) {
          // Check if this looks like a real name/company name
          const isLikelyName = /^[A-Z][a-zA-Z\s&.,]+$/.test(extractedName);
          if (isLikelyName && !entities.some(e => e.name.includes(extractedName) || extractedName.includes(e.name))) {
            entities.push({
              id: `entity-${entities.length + 1}`,
              name: extractedName,
              type: extractedName.toLowerCase().includes('ltd') || extractedName.toLowerCase().includes('inc') || extractedName.toLowerCase().includes('corp') ? 'Company' : 'Person',
              role: 'Party',
              description: `Identified party: ${extractedName}`
            });
          }
        }
      }
    });

    return entities.length > 0 ? entities : [
      {
        id: 'entity-1',
        name: 'Party A',
        type: 'Person',
        role: 'Contracting Party',
        description: 'First contracting party'
      },
      {
        id: 'entity-2',
        name: 'Party B',
        type: 'Person',
        role: 'Contracting Party',
        description: 'Second contracting party'
      }
    ];
  }

  private extractClauses(text: string): ContractClause[] {
    const clauses: ContractClause[] = [];
    const lowerText = text.toLowerCase();

    // Enhanced clause detection patterns
    const clausePatterns = [
      // Payment-related clauses
      {
        keywords: ['rent', 'payment', 'monthly', 'salary', 'compensation', 'fee'],
        title: 'Payment Terms',
        type: 'Payment' as const,
        riskAssessor: this.assessPaymentRisk.bind(this),
        explanationGenerator: this.generatePaymentExplanation.bind(this)
      },

    // Security deposit clauses
      {
        keywords: ['deposit', 'security', 'advance', 'bond'],
        title: 'Security Deposit',
        type: 'Security' as const,
        riskAssessor: this.assessDepositRisk.bind(this),
        explanationGenerator: this.generateDepositExplanation.bind(this)
      },

    // Termination clauses
      {
        keywords: ['terminate', 'notice', 'end', 'expire', 'cancel'],
        title: 'Termination Notice',
        type: 'Termination' as const,
        riskAssessor: this.assessTerminationRisk.bind(this),
        explanationGenerator: this.generateTerminationExplanation.bind(this)
      },
      
      // Maintenance clauses
      {
        keywords: ['maintenance', 'repair', 'upkeep', 'damage'],
        title: 'Maintenance Responsibility',
        type: 'Maintenance' as const,
        riskAssessor: this.assessMaintenanceRisk.bind(this),
        explanationGenerator: this.generateMaintenanceExplanation.bind(this)
      },
      
      // Liability clauses
      {
        keywords: ['liability', 'damage', 'responsible', 'indemnify'],
        title: 'Liability and Damages',
        type: 'Liability' as const,
        riskAssessor: this.assessLiabilityRisk.bind(this),
        explanationGenerator: this.generateLiabilityExplanation.bind(this)
      },
      
      // Confidentiality clauses
      {
        keywords: ['confidential', 'privacy', 'non-disclosure', 'proprietary'],
        title: 'Confidentiality',
        type: 'Confidentiality' as const,
        riskAssessor: this.assessConfidentialityRisk.bind(this),
        explanationGenerator: this.generateConfidentialityExplanation.bind(this)
      },
      
      // Non-compete clauses
      {
        keywords: ['non-compete', 'competing', 'competition', 'restrict'],
        title: 'Non-Compete Clause',
        type: 'Other' as const,
        riskAssessor: this.assessNonCompeteRisk.bind(this),
        explanationGenerator: this.generateNonCompeteExplanation.bind(this)
      },
      
      // Intellectual Property clauses
      {
        keywords: ['intellectual property', 'ip', 'patent', 'copyright', 'trademark'],
        title: 'Intellectual Property',
        type: 'Other' as const,
        riskAssessor: this.assessIPRisk.bind(this),
        explanationGenerator: this.generateIPExplanation.bind(this)
      },
      
      // Force Majeure clauses
      {
        keywords: ['force majeure', 'act of god', 'unforeseen', 'circumstances'],
        title: 'Force Majeure',
        type: 'Other' as const,
        riskAssessor: this.assessForceMajeureRisk.bind(this),
        explanationGenerator: this.generateForceMajeureExplanation.bind(this)
      },
      
      // Governing Law clauses
      {
        keywords: ['governing law', 'jurisdiction', 'legal', 'court'],
        title: 'Governing Law',
        type: 'Other' as const,
        riskAssessor: this.assessGoverningLawRisk.bind(this),
        explanationGenerator: this.generateGoverningLawExplanation.bind(this)
      }
    ];

    // Extract clauses based on patterns
    clausePatterns.forEach((pattern, index) => {
      const hasKeywords = pattern.keywords.some(keyword => lowerText.includes(keyword));
      
      if (hasKeywords) {
        const clauseId = `clause-${index + 1}`;
        const content = this.extractClauseText(text, pattern.keywords);
        
      clauses.push({
          id: clauseId,
          title: pattern.title,
          type: pattern.type,
          content,
          riskLevel: pattern.riskAssessor(text),
          explanation: pattern.explanationGenerator(text),
          entities: this.getRelevantEntities(text, pattern.keywords),
          relatedClauses: this.getRelatedClauses(clauses, pattern.keywords)
        });
      }
    });

    // Extract numbered clauses/sections
    const numberedClausePattern = /(\d+\.?\s+[A-Z][^.]*?)(?:\n|$)/g;
    let match;
    let clauseCounter = clauses.length + 1;

    while ((match = numberedClausePattern.exec(text)) !== null) {
      const clauseTitle = match[1].trim();
      if (clauseTitle.length > 5 && clauseTitle.length < 100) {
        // Check if this clause hasn't been captured by keyword patterns
        const isAlreadyCaptured = clauses.some(c => 
          c.title.toLowerCase().includes(clauseTitle.toLowerCase().split(' ')[0]) ||
          clauseTitle.toLowerCase().includes(c.title.toLowerCase().split(' ')[0])
        );

        if (!isAlreadyCaptured) {
          const clauseId = `clause-${clauseCounter++}`;
          const riskLevel = this.assessGenericClauseRisk(text, clauseTitle);
          
      clauses.push({
            id: clauseId,
            title: clauseTitle,
            type: 'Other',
            content: this.extractClauseText(text, clauseTitle.split(' ').slice(0, 3)),
            riskLevel,
            explanation: this.generateGenericExplanation(text, clauseTitle),
            entities: this.getRelevantEntities(text, clauseTitle.split(' ')),
        relatedClauses: []
      });
    }
      }
    }

    return clauses;
  }

  private identifyRelationships(entities: ContractEntity[], clauses: ContractClause[]) {
    const relationships = [];
    
    // Add relationships between entities and clauses
    clauses.forEach(clause => {
      clause.entities.forEach(entityId => {
        relationships.push({
          from: entityId,
          to: clause.id,
          type: 'obligation' as const,
          description: `${entities.find(e => e.id === entityId)?.name} has obligations under ${clause.title}`
        });
      });
    });

    // Add relationships between related clauses
    clauses.forEach(clause => {
      clause.relatedClauses.forEach(relatedClauseId => {
        relationships.push({
          from: clause.id,
          to: relatedClauseId,
          type: 'dependency' as const,
          description: `${clause.title} is related to ${clauses.find(c => c.id === relatedClauseId)?.title}`
        });
      });
    });

    return relationships;
  }

  private calculateOverallRisk(clauses: ContractClause[]): 'low' | 'medium' | 'high' {
    const riskCounts = clauses.reduce((acc, clause) => {
      acc[clause.riskLevel]++;
      return acc;
    }, { safe: 0, warning: 0, danger: 0 });

    if (riskCounts.danger > 2 || (riskCounts.danger > 0 && riskCounts.warning > 3)) {
      return 'high';
    } else if (riskCounts.danger > 0 || riskCounts.warning > 2) {
      return 'medium';
    } else {
      return 'low';
    }
  }

  private generateSummary(entities: ContractEntity[], clauses: ContractClause[], overallRisk: string): string {
    const entityCount = entities.length;
    const clauseCount = clauses.length;
    const riskClauses = clauses.filter(c => c.riskLevel !== 'safe').length;

    return `This contract involves ${entityCount} parties with ${clauseCount} key clauses. ${riskClauses} clauses require attention due to potential risks. Overall risk level: ${overallRisk}.`;
  }

  // Risk assessment methods
  private assessPaymentRisk(text: string): 'safe' | 'warning' | 'danger' {
    const lowerText = text.toLowerCase();
    
    if (lowerText.includes('penalty') && lowerText.includes('late')) {
      return 'warning';
    }
    if (lowerText.includes('interest') && lowerText.includes('compound')) {
      return 'danger';
    }
    return 'safe';
  }

  private assessDepositRisk(text: string): 'safe' | 'warning' | 'danger' {
    const lowerText = text.toLowerCase();
    
    // Check for excessive deposit amounts
    const depositMatch = lowerText.match(/(\d+)\s*(months?|times?)\s*(rent|payment)/);
    if (depositMatch) {
      const amount = parseInt(depositMatch[1]);
      if (amount > 3) return 'danger';
      if (amount > 2) return 'warning';
    }
    
    return 'safe';
  }

  private assessTerminationRisk(text: string): 'safe' | 'warning' | 'danger' {
    const lowerText = text.toLowerCase();
    
    if (lowerText.includes('penalty') && lowerText.includes('termination')) {
      return 'warning';
    }
    if (lowerText.includes('no termination') || lowerText.includes('fixed term')) {
      return 'danger';
    }
    return 'safe';
  }

  private assessMaintenanceRisk(text: string): 'safe' | 'warning' | 'danger' {
    const lowerText = text.toLowerCase();
    
    if (lowerText.includes('tenant') && lowerText.includes('structural')) {
      return 'danger';
    }
    if (lowerText.includes('tenant') && lowerText.includes('major')) {
      return 'warning';
    }
    return 'safe';
  }

  private assessLiabilityRisk(text: string): 'safe' | 'warning' | 'danger' {
    const lowerText = text.toLowerCase();
    
    if (lowerText.includes('unlimited') || lowerText.includes('all damages')) {
      return 'danger';
    }
    if (lowerText.includes('punitive') || lowerText.includes('consequential')) {
      return 'warning';
    }
    return 'safe';
  }

  // Explanation generation methods
  private generatePaymentExplanation(text: string): string {
    const lowerText = text.toLowerCase();
    
    if (lowerText.includes('penalty')) {
      return 'This clause includes late payment penalties. Review the penalty structure to ensure it\'s reasonable and legally enforceable.';
    }
    return 'Standard payment terms with clear due dates and amounts. This appears to be a fair arrangement.';
  }

  private generateDepositExplanation(text: string): string {
    const lowerText = text.toLowerCase();
    const depositMatch = lowerText.match(/(\d+)\s*(months?|times?)\s*(rent|payment)/);
    
    if (depositMatch) {
      const amount = parseInt(depositMatch[1]);
      if (amount > 2) {
        return `Security deposit of ${amount} months exceeds the legal limit of 2 months in most jurisdictions. This clause may be unenforceable.`;
      }
    }
    return 'Security deposit amount appears reasonable and within legal limits.';
  }

  private generateTerminationExplanation(text: string): string {
    const lowerText = text.toLowerCase();
    
    if (lowerText.includes('penalty')) {
      return 'Early termination penalty clause detected. Consider negotiating the penalty amount to ensure it\'s reasonable.';
    }
    return 'Standard termination notice period provides reasonable time for both parties to prepare.';
  }

  private generateMaintenanceExplanation(text: string): string {
    const lowerText = text.toLowerCase();
    
    if (lowerText.includes('tenant') && lowerText.includes('structural')) {
      return 'Requiring tenant to pay for structural repairs is unusual and potentially unfair. Structural issues are typically landlord responsibilities.';
    }
    return 'Maintenance responsibilities are clearly defined between parties.';
  }

  private generateLiabilityExplanation(text: string): string {
    const lowerText = text.toLowerCase();
    
    if (lowerText.includes('unlimited')) {
      return 'Unlimited liability clauses are extremely risky and may be unenforceable. Consider negotiating liability caps.';
    }
    return 'Liability terms appear reasonable with appropriate limitations.';
  }

  private extractClauseText(text: string, keywords: string[]): string {
    // Enhanced text extraction
    const sentences = text.split(/[.!?]+/);
    const relevantSentences = sentences.filter(sentence => 
      keywords.some(keyword => sentence.toLowerCase().includes(keyword))
    );
    
    if (relevantSentences.length === 0) {
      return `Clause related to: ${keywords.join(', ')}`;
    }
    
    return relevantSentences.slice(0, 2).join('. ') + '.';
  }

  private getRelevantEntities(text: string, keywords: string[]): string[] {
    // Return entity IDs that are most relevant to these keywords
    const lowerText = text.toLowerCase();
    const relevantEntities: string[] = [];
    
    if (keywords.some(k => ['tenant', 'lessee', 'renter'].includes(k.toLowerCase()))) {
      relevantEntities.push('entity-1');
    }
    if (keywords.some(k => ['landlord', 'lessor', 'owner'].includes(k.toLowerCase()))) {
      relevantEntities.push('entity-2');
    }
    if (keywords.some(k => ['employer', 'company'].includes(k.toLowerCase()))) {
      relevantEntities.push('entity-1');
    }
    if (keywords.some(k => ['employee', 'worker'].includes(k.toLowerCase()))) {
      relevantEntities.push('entity-2');
    }
    
    // Default to all entities if no specific match
    return relevantEntities.length > 0 ? relevantEntities : ['entity-1', 'entity-2'];
  }

  private getRelatedClauses(existingClauses: ContractClause[], keywords: string[]): string[] {
    // Find related clauses based on keyword overlap
    const relatedClauseIds: string[] = [];
    
    existingClauses.forEach(clause => {
      const clauseKeywords = clause.title.toLowerCase().split(' ');
      const hasOverlap = keywords.some(keyword => 
        clauseKeywords.some(ck => ck.includes(keyword) || keyword.includes(ck))
      );
      
      if (hasOverlap) {
        relatedClauseIds.push(clause.id);
      }
    });
    
    return relatedClauseIds;
  }

  // New risk assessment methods
  private assessConfidentialityRisk(text: string): 'safe' | 'warning' | 'danger' {
    const lowerText = text.toLowerCase();
    
    if (lowerText.includes('unlimited') && lowerText.includes('confidential')) {
      return 'danger';
    }
    if (lowerText.includes('perpetual') || lowerText.includes('forever')) {
      return 'warning';
    }
    return 'safe';
  }

  private assessNonCompeteRisk(text: string): 'safe' | 'warning' | 'danger' {
    const lowerText = text.toLowerCase();
    
    // Check for excessive duration
    const durationMatch = lowerText.match(/(\d+)\s*(years?|months?)/);
    if (durationMatch) {
      const duration = parseInt(durationMatch[1]);
      const unit = durationMatch[2];
      const months = unit.includes('year') ? duration * 12 : duration;
      
      if (months > 24) return 'danger';
      if (months > 12) return 'warning';
    }
    
    if (lowerText.includes('unlimited') || lowerText.includes('worldwide')) {
      return 'danger';
    }
    
    return 'safe';
  }

  private assessIPRisk(text: string): 'safe' | 'warning' | 'danger' {
    const lowerText = text.toLowerCase();
    
    if (lowerText.includes('all rights') && lowerText.includes('employer')) {
      return 'warning';
    }
    if (lowerText.includes('pre-existing') && lowerText.includes('assign')) {
      return 'danger';
    }
    return 'safe';
  }

  private assessForceMajeureRisk(text: string): 'safe' | 'warning' | 'danger' {
    const lowerText = text.toLowerCase();
    
    if (!lowerText.includes('force majeure')) {
      return 'warning'; // Missing force majeure clause
    }
    
    if (lowerText.includes('pandemic') || lowerText.includes('epidemic')) {
      return 'safe';
    }
    
    return 'safe';
  }

  private assessGoverningLawRisk(text: string): 'safe' | 'warning' | 'danger' {
    const lowerText = text.toLowerCase();
    
    if (!lowerText.includes('governing law') && !lowerText.includes('jurisdiction')) {
      return 'warning';
    }
    
    return 'safe';
  }

  private assessGenericClauseRisk(text: string, clauseTitle: string): 'safe' | 'warning' | 'danger' {
    const lowerText = text.toLowerCase();
    const titleLower = clauseTitle.toLowerCase();
    
    // High-risk keywords
    const dangerKeywords = ['penalty', 'fine', 'unlimited', 'all damages', 'waiver'];
    if (dangerKeywords.some(keyword => lowerText.includes(keyword))) {
      return 'danger';
    }
    
    // Warning keywords
    const warningKeywords = ['modify', 'change', 'discretion', 'sole discretion'];
    if (warningKeywords.some(keyword => lowerText.includes(keyword))) {
      return 'warning';
    }
    
    return 'safe';
  }

  // New explanation generation methods
  private generateConfidentialityExplanation(text: string): string {
    const lowerText = text.toLowerCase();
    
    if (lowerText.includes('unlimited')) {
      return 'Unlimited confidentiality obligations may be overly broad and difficult to enforce. Consider defining specific time limits and scope.';
    }
    if (lowerText.includes('perpetual')) {
      return 'Perpetual confidentiality obligations are unusual and may be unreasonable. Standard practice is 2-5 years after contract termination.';
    }
    return 'Confidentiality clause appears reasonable with appropriate limitations and scope.';
  }

  private generateNonCompeteExplanation(text: string): string {
    const lowerText = text.toLowerCase();
    const durationMatch = lowerText.match(/(\d+)\s*(years?|months?)/);
    
    if (durationMatch) {
      const duration = parseInt(durationMatch[1]);
      const unit = durationMatch[2];
      const months = unit.includes('year') ? duration * 12 : duration;
      
      if (months > 24) {
        return `Non-compete duration of ${duration} ${unit} exceeds typical limits. Most jurisdictions limit non-compete clauses to 1-2 years maximum.`;
      }
      if (months > 12) {
        return `Non-compete duration of ${duration} ${unit} is on the longer side. Ensure this is reasonable for your industry and role.`;
      }
    }
    
    return 'Non-compete clause appears reasonable in scope and duration.';
  }

  private generateIPExplanation(text: string): string {
    const lowerText = text.toLowerCase();
    
    if (lowerText.includes('all rights') && lowerText.includes('employer')) {
      return 'Broad intellectual property assignment to employer may be overly restrictive. Consider negotiating exceptions for personal projects or pre-existing work.';
    }
    if (lowerText.includes('pre-existing') && lowerText.includes('assign')) {
      return 'Assignment of pre-existing intellectual property is unusual and potentially problematic. Ensure you retain rights to work created before employment.';
    }
    return 'Intellectual property clause appears balanced and fair.';
  }

  private generateForceMajeureExplanation(text: string): string {
    const lowerText = text.toLowerCase();
    
    if (!lowerText.includes('force majeure')) {
      return 'Missing force majeure clause. Consider adding protection for unforeseen circumstances that prevent contract performance.';
    }
    
    return 'Force majeure clause provides appropriate protection for unforeseen circumstances.';
  }

  private generateGoverningLawExplanation(text: string): string {
    const lowerText = text.toLowerCase();
    
    if (!lowerText.includes('governing law') && !lowerText.includes('jurisdiction')) {
      return 'Missing governing law clause. This could lead to uncertainty about which laws apply to disputes.';
    }
    
    return 'Governing law clause clearly specifies applicable jurisdiction and legal framework.';
  }

  private generateGenericExplanation(text: string, clauseTitle: string): string {
    const lowerText = text.toLowerCase();
    const titleLower = clauseTitle.toLowerCase();
    
    if (lowerText.includes('penalty')) {
      return `This ${clauseTitle} clause includes penalties. Review the penalty structure to ensure it's reasonable and legally enforceable.`;
    }
    if (lowerText.includes('unlimited')) {
      return `This ${clauseTitle} clause contains unlimited liability or obligations, which may be unenforceable or unreasonable.`;
    }
    if (lowerText.includes('discretion')) {
      return `This ${clauseTitle} clause grants broad discretion to one party. Consider negotiating more specific terms and limitations.`;
    }
    
    return `This ${clauseTitle} clause appears to be standard and reasonable. Review the specific terms to ensure they meet your needs.`;
  }
}

// Document parsing utilities
export class DocumentParser {
  static async parseFile(file: File): Promise<string> {
    const fileType = file.type;
    const fileName = file.name.toLowerCase();

    if (fileType === 'text/plain' || fileName.endsWith('.txt')) {
      return await this.parseTextFile(file);
    } else if (fileType === 'application/pdf' || fileName.endsWith('.pdf')) {
      return await this.parsePdfFile(file);
    } else if (fileName.endsWith('.docx') || fileName.endsWith('.doc')) {
      return await this.parseWordFile(file);
    } else {
      throw new Error('Unsupported file type. Please upload a PDF, Word document, or text file.');
    }
  }

  private static async parseTextFile(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        resolve(e.target?.result as string);
      };
      reader.onerror = reject;
      reader.readAsText(file);
    });
  }

  private static async parsePdfFile(file: File): Promise<string> {
    // Mock PDF parsing - in production, use pdf-parse or similar library
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(`PDF Content: ${file.name}
        
        This is a mock PDF parsing result. In a real implementation, this would extract the actual text content from the PDF file.
        
        Sample contract text:
        The Tenant shall pay monthly rent of INR 25,000 on or before the 5th day of each calendar month.
        Tenant must provide security deposit equivalent to four (4) months rent in advance.
        All maintenance and repairs, including structural issues, shall be borne by the Tenant.
        Either party may terminate this agreement by providing thirty (30) days written notice.
        In case of early termination by Tenant, a penalty equivalent to two months rent shall apply.`);
      }, 1000);
    });
  }

  private static async parseWordFile(file: File): Promise<string> {
    // Mock Word parsing - in production, use mammoth or similar library
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(`Word Document Content: ${file.name}
        
        This is a mock Word document parsing result. In a real implementation, this would extract the actual text content from the Word file.
        
        Sample contract text:
        The Tenant shall pay monthly rent of INR 25,000 on or before the 5th day of each calendar month.
        Tenant must provide security deposit equivalent to four (4) months rent in advance.
        All maintenance and repairs, including structural issues, shall be borne by the Tenant.
        Either party may terminate this agreement by providing thirty (30) days written notice.
        In case of early termination by Tenant, a penalty equivalent to two months rent shall apply.`);
      }, 1000);
    });
  }
}
