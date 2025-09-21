// Sample contract data for demonstration
export const sampleContracts = {
  rentalAgreement: `RENTAL AGREEMENT

This Rental Agreement ("Agreement") is entered into on [Date] between:

LANDLORD: [Landlord Name], residing at [Address] ("Landlord")
TENANT: [Tenant Name], residing at [Address] ("Tenant")

1. PROPERTY DESCRIPTION
The Landlord agrees to rent to the Tenant the property located at [Property Address] ("Property").

2. TERM OF LEASE
The lease term shall commence on [Start Date] and end on [End Date], unless terminated earlier in accordance with this Agreement.

3. RENT PAYMENT
The Tenant shall pay monthly rent of INR 25,000 on or before the 5th day of each calendar month. Late payment shall incur a penalty of INR 500 per day.

4. SECURITY DEPOSIT
Tenant must provide security deposit equivalent to four (4) months rent in advance, totaling INR 100,000. This deposit shall be refundable upon satisfactory completion of the lease term.

5. MAINTENANCE AND REPAIRS
All maintenance and repairs, including structural issues, plumbing, electrical, and HVAC systems, shall be borne by the Tenant. The Landlord shall not be responsible for any maintenance costs.

6. TERMINATION
Either party may terminate this agreement by providing thirty (30) days written notice. In case of early termination by Tenant, a penalty equivalent to two months rent shall apply.

7. LIABILITY
The Tenant shall be fully liable for all damages to the Property, including but not limited to structural damage, and shall indemnify the Landlord against all claims arising from Tenant's use of the Property.

8. SUBLETTING
The Tenant shall not sublet, assign, or transfer any interest in this Agreement without prior written consent from the Landlord.

9. PETS
No pets are allowed on the Property without written permission from the Landlord.

10. GOVERNING LAW
This Agreement shall be governed by the laws of [State/Country].`,

  employmentContract: `EMPLOYMENT AGREEMENT

This Employment Agreement ("Agreement") is entered into between:

EMPLOYER: TechCorp Solutions Pvt Ltd, a company incorporated under the Companies Act, 2013 ("Company")
EMPLOYEE: [Employee Name], residing at [Address] ("Employee")

1. POSITION AND DUTIES
The Employee shall serve as [Job Title] and shall perform all duties and responsibilities as assigned by the Company.

2. COMPENSATION
The Employee shall receive a monthly salary of INR 75,000, payable on the last working day of each month. The Company reserves the right to modify compensation with 30 days notice.

3. WORKING HOURS
The Employee shall work 8 hours per day, 5 days per week. Overtime work shall not be compensated unless specifically approved by management.

4. CONFIDENTIALITY
The Employee agrees to maintain strict confidentiality regarding all Company information, including but not limited to trade secrets, client data, and business strategies. This obligation shall survive termination of employment.

5. NON-COMPETE CLAUSE
For a period of 12 months following termination, the Employee shall not work for any competing company or start a competing business within a 50km radius of the Company's office.

6. TERMINATION
Either party may terminate this Agreement with 30 days written notice. The Company may terminate immediately for cause, including but not limited to breach of confidentiality or non-performance.

7. INTELLECTUAL PROPERTY
All work products, inventions, and intellectual property created by the Employee during employment shall be the sole property of the Company.

8. LIABILITY LIMITATION
The Company's liability to the Employee shall be limited to the amount of one month's salary, regardless of the nature of the claim.

9. GOVERNING LAW
This Agreement shall be governed by the laws of India and any disputes shall be subject to the exclusive jurisdiction of courts in [City].`,

  serviceAgreement: `SERVICE AGREEMENT

This Service Agreement ("Agreement") is entered into between:

SERVICE PROVIDER: Digital Solutions Inc, a company registered under [Registration Details] ("Provider")
CLIENT: [Client Name], a company registered under [Registration Details] ("Client")

1. SCOPE OF SERVICES
The Provider shall deliver web development services including frontend development, backend integration, and database design as specified in the attached Statement of Work.

2. PAYMENT TERMS
The Client shall pay a total fee of INR 500,000 in the following installments:
- 50% upon signing this Agreement
- 30% upon completion of Phase 1
- 20% upon final delivery

3. TIMELINE
The project shall be completed within 90 days from the commencement date. Delays caused by Client's failure to provide required materials shall extend the timeline accordingly.

4. INTELLECTUAL PROPERTY
Upon full payment, the Client shall own all rights to the delivered work product. The Provider retains rights to any pre-existing intellectual property used in the project.

5. CONFIDENTIALITY
Both parties agree to maintain confidentiality of all proprietary information disclosed during the course of this Agreement.

6. WARRANTY
The Provider warrants that the delivered services will be free from material defects for a period of 90 days from delivery.

7. LIMITATION OF LIABILITY
The Provider's total liability shall not exceed the total amount paid under this Agreement. The Provider shall not be liable for any indirect, consequential, or punitive damages.

8. TERMINATION
Either party may terminate this Agreement with 15 days written notice. Upon termination, the Client shall pay for all work completed up to the termination date.

9. FORCE MAJEURE
Neither party shall be liable for delays or failures due to circumstances beyond their reasonable control.

10. GOVERNING LAW
This Agreement shall be governed by the laws of [Jurisdiction] and any disputes shall be resolved through binding arbitration.`
};

export const contractTypes = [
  { id: 'rental', name: 'Rental Agreement', description: 'Residential or commercial lease agreement' },
  { id: 'employment', name: 'Employment Contract', description: 'Employee-employer agreement' },
  { id: 'service', name: 'Service Agreement', description: 'Service provider-client contract' }
];
