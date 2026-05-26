/**
 * Service request form definitions (A–M).
 * Used by ProcessStepsSection to render service-specific fields and submit meta.
 */

export type FieldType = "radio" | "select" | "textarea" | "text" | "number" | "date" | "multicheck"

export type ServiceField = {
  key: string
  label: string
  type: FieldType
  options?: { value: string; label: string }[]
  showWhen?: { field: string; oneOf: string[] }
  required?: boolean
  helperText?: string
  placeholder?: string
}

export type ServiceFormConfig = {
  id: string
  label: string
  purpose: string
  fields: ServiceField[]
}

const option = (value: string, label?: string) => ({ value, label: label ?? value })

export const SERVICE_FORMS: ServiceFormConfig[] = [
  {
    id: "Bookkeeping",
    label: "Bookkeeping",
    purpose: "Request bookkeeping services to start, extend, review, or correct accounting records.",
    fields: [
      {
        key: "need",
        label: "What do you need?",
        type: "radio",
        required: true,
        options: [
          option("Start bookkeeping"),
          option("Catch-up / backlog"),
          option("Review / corrections"),
          option("Monthly extension"),
          option("Other"),
        ],
      },
      { key: "needOther", label: "Please specify", type: "text", placeholder: "Specify...", showWhen: { field: "need", oneOf: ["Other"] } },
      {
        key: "periodType",
        label: "Period type (optional)",
        type: "radio",
        options: [option("Month"), option("Quarter")],
        showWhen: { field: "need", oneOf: ["Catch-up / backlog", "Review / corrections", "Monthly extension"] },
      },
      {
        key: "period",
        label: "Which periods are affected?",
        type: "text",
        placeholder: "e.g. Jan–Mar 2025 or Q1 2025",
        showWhen: { field: "need", oneOf: ["Catch-up / backlog", "Review / corrections", "Monthly extension"] },
      },
      {
        key: "missingDocuments",
        label: "Do you have missing documents?",
        type: "radio",
        options: [option("Yes"), option("No"), option("Not sure")],
      },
      {
        key: "details",
        label: "Additional details (optional)",
        type: "textarea",
        placeholder: "Briefly explain the situation, volume of transactions, or any known issues.",
        helperText: "You may briefly explain the situation, volume of transactions, or any known issues.",
      },
    ],
  },
  {
    id: "VAT / Tax",
    label: "VAT / Tax",
    purpose: "Request VAT or tax-related services including filings, reviews, corrections, and registrations.",
    fields: [
      {
        key: "type",
        label: "Type of VAT service",
        type: "radio",
        required: true,
        options: [
          option("VAT return"),
          option("VAT review"),
          option("VAT correction"),
          option("VAT registration"),
          option("VAT deregistration"),
          option("Other"),
        ],
      },
      { key: "typeOther", label: "Please specify", type: "text", showWhen: { field: "type", oneOf: ["Other"] } },
      { key: "correctionPeriod", label: "Which period needs correction?", type: "text", placeholder: "e.g. Q2 2025", showWhen: { field: "type", oneOf: ["VAT correction"] } },
      {
        key: "reviewReason",
        label: "Reason for review",
        type: "radio",
        options: [
          option("Cross-border transactions"),
          option("Unusual amounts"),
          option("Audit preparation"),
          option("Other"),
        ],
        showWhen: { field: "type", oneOf: ["VAT review"] },
      },
      { key: "reviewReasonOther", label: "Please specify", type: "text", showWhen: { field: "reviewReason", oneOf: ["Other"] } },
      { key: "effectiveDate", label: "Effective date (if known)", type: "date", showWhen: { field: "type", oneOf: ["VAT registration"] } },
      {
        key: "details",
        label: "Additional details (optional)",
        type: "textarea",
        placeholder: "Describe the issue, transaction volume, or relevant background.",
      },
    ],
  },
  {
    id: "Payroll",
    label: "Payroll",
    purpose: "Request payroll services to start payroll, make changes, review existing payroll, or correct payroll records.",
    fields: [
      {
        key: "need",
        label: "What do you need?",
        type: "radio",
        required: true,
        options: [
          option("Start payroll"),
          option("Add or remove employees"),
          option("Payroll review"),
          option("Payroll correction"),
          option("Other"),
        ],
      },
      { key: "needOther", label: "Please specify", type: "text", showWhen: { field: "need", oneOf: ["Other"] } },
      { key: "employeesAffected", label: "Number of employees affected", type: "number", placeholder: "0", showWhen: { field: "need", oneOf: ["Add or remove employees"] } },
      { key: "correctionPeriod", label: "Which payroll period needs correction?", type: "text", placeholder: "e.g. March 2025", showWhen: { field: "need", oneOf: ["Payroll correction"] } },
      { key: "expectedStartMonth", label: "Expected start month", type: "text", placeholder: "e.g. April 2025", showWhen: { field: "need", oneOf: ["Start payroll"] } },
      {
        key: "details",
        label: "Additional details (optional)",
        type: "textarea",
        placeholder: "Pay frequency, special allowances, benefits, or known payroll issues.",
      },
    ],
  },
  {
    id: "Audit & Annual Accounts",
    label: "Audit & Annual Accounts",
    purpose: "Request audit-related services strictly related to annual accounts and financial statements.",
    fields: [
      {
        key: "type",
        label: "Type of audit service",
        type: "radio",
        required: true,
        options: [
          option("Statutory audit of annual accounts"),
          option("Audit-ready financial statements"),
        ],
      },
      { key: "financialYear", label: "Financial year", type: "text", placeholder: "e.g. 2024", showWhen: { field: "type", oneOf: ["Statutory audit of annual accounts"] } },
      { key: "auditDeadline", label: "Audit deadline (if known)", type: "date", showWhen: { field: "type", oneOf: ["Statutory audit of annual accounts"] } },
      {
        key: "firstAudit",
        label: "Is this the first statutory audit for this entity?",
        type: "radio",
        options: [option("Yes"), option("No"), option("Not sure")],
        showWhen: { field: "type", oneOf: ["Statutory audit of annual accounts"] },
      },
      {
        key: "purpose",
        label: "Purpose of the audit-ready financial statements",
        type: "radio",
        options: [
          option("Statutory audit"),
          option("Bank or investor requirement"),
          option("Regulatory submission"),
          option("Other"),
        ],
        showWhen: { field: "type", oneOf: ["Audit-ready financial statements"] },
      },
      { key: "purposeOther", label: "Please specify", type: "text", showWhen: { field: "purpose", oneOf: ["Other"] } },
      { key: "details", label: "Additional details (optional)", type: "textarea", placeholder: "Reporting framework, group structure, or known issues from prior years." },
    ],
  },
  {
    id: "Advisory & Compliance — Special Matters",
    label: "Advisory & Compliance — Special Matters",
    purpose: "Contract review, compliance advisory, or project/transaction coordination. Does not cover corporate changes, share transfers, liquidation, or litigation.",
    fields: [
      {
        key: "need",
        label: "What do you need?",
        type: "radio",
        required: true,
        options: [
          option("Contract / document review"),
          option("Compliance advisory"),
          option("Project or transaction coordination"),
          option("Other"),
        ],
      },
      { key: "needOther", label: "Please specify", type: "text", showWhen: { field: "need", oneOf: ["Other"] } },
      { key: "documentType", label: "Type of document", type: "text", showWhen: { field: "need", oneOf: ["Contract / document review"] } },
      {
        key: "reviewHelp",
        label: "What do you need help with?",
        type: "multicheck",
        options: [
          option("Review and comments"),
          option("Risk or issue identification"),
          option("Management summary"),
          option("Other"),
        ],
        showWhen: { field: "need", oneOf: ["Contract / document review"] },
      },
      { key: "urgency", label: "Urgency", type: "radio", options: [option("Standard"), option("Urgent")], showWhen: { field: "need", oneOf: ["Contract / document review"] } },
      {
        key: "complianceArea",
        label: "Area of compliance",
        type: "multicheck",
        options: [
          option("Corporate compliance"),
          option("Banking / KYC readiness"),
          option("Regulatory or licensing-related compliance"),
          option("Cross-border considerations"),
          option("Other"),
        ],
        showWhen: { field: "need", oneOf: ["Compliance advisory"] },
      },
      {
        key: "projectType",
        label: "Type of project",
        type: "radio",
        options: [
          option("Banking or financing support"),
          option("Investor or third-party coordination"),
          option("Commercial transaction support"),
          option("Internal planning or structuring (non-filing)"),
          option("Other"),
        ],
        showWhen: { field: "need", oneOf: ["Project or transaction coordination"] },
      },
      { key: "projectTypeOther", label: "Please specify", type: "text", showWhen: { field: "projectType", oneOf: ["Other"] } },
      { key: "deadline", label: "Is there a deadline?", type: "date", showWhen: { field: "need", oneOf: ["Project or transaction coordination"] } },
      { key: "details", label: "Additional details", type: "textarea", placeholder: "Background, parties involved, or outcome you are seeking." },
    ],
  },
  {
    id: "Corporate & CSP Services",
    label: "Corporate & CSP Services",
    purpose: "Company formation, registered office, company secretary, director services, or ongoing corporate administration (CSP). Does not cover company structure changes or liquidation.",
    fields: [
      {
        key: "need",
        label: "What do you need?",
        type: "radio",
        required: true,
        options: [
          option("Company formation"),
          option("Registered office services"),
          option("Company secretary services"),
          option("Director services"),
          option("Ongoing corporate administration (CSP)"),
          option("Other"),
        ],
      },
      { key: "needOther", label: "Please specify", type: "text", showWhen: { field: "need", oneOf: ["Other"] } },
      { key: "countryOfIncorporation", label: "Country of incorporation", type: "text", placeholder: "e.g. Malta", showWhen: { field: "need", oneOf: ["Company formation"] } },
      { key: "timeline", label: "Estimated timeline", type: "radio", options: [option("ASAP"), option("Flexible")], showWhen: { field: "need", oneOf: ["Company formation"] } },
      {
        key: "registeredOfficeType",
        label: "Type of request",
        type: "radio",
        options: [option("Set up registered office"), option("Change registered office"), option("Annual renewal")],
        showWhen: { field: "need", oneOf: ["Registered office services"] },
      },
      {
        key: "secretaryType",
        label: "Type of request",
        type: "radio",
        options: [option("Appointment"), option("Annual renewal"), option("Change of secretary")],
        showWhen: { field: "need", oneOf: ["Company secretary services"] },
      },
      {
        key: "directorType",
        label: "Type of request",
        type: "radio",
        options: [option("Natural person director"), option("Corporate director"), option("Nominee director")],
        showWhen: { field: "need", oneOf: ["Director services"] },
      },
      {
        key: "directorNature",
        label: "Nature of request",
        type: "radio",
        options: [option("Appointment"), option("Annual renewal")],
        showWhen: { field: "need", oneOf: ["Director services"] },
      },
      {
        key: "cspScope",
        label: "Scope requested",
        type: "multicheck",
        options: [
          option("Statutory registers maintenance"),
          option("Annual return and MBR filings"),
          option("Beneficial ownership (UBO) maintenance"),
          option("Substance and compliance support"),
        ],
        showWhen: { field: "need", oneOf: ["Ongoing corporate administration (CSP)"] },
      },
      { key: "details", label: "Additional details (optional)", type: "textarea", placeholder: "Background, urgency, or specific requirements." },
    ],
  },
  {
    id: "Company Structure & Corporate Changes",
    label: "Company Structure & Corporate Changes",
    purpose: "Share transfers, director/shareholder changes, share capital, name change, memorandum amendment, or restructuring/merger.",
    fields: [
      {
        key: "need",
        label: "What do you need?",
        type: "radio",
        required: true,
        options: [
          option("Share transfer"),
          option("Director change"),
          option("Shareholder change"),
          option("Share capital change"),
          option("Company name change"),
          option("Memorandum / objects amendment"),
          option("Restructuring or merger"),
          option("Other"),
        ],
      },
      { key: "needOther", label: "Please specify", type: "text", showWhen: { field: "need", oneOf: ["Other"] } },
      { key: "sharePercent", label: "Estimated percentage being transferred", type: "number", showWhen: { field: "need", oneOf: ["Share transfer"] } },
      { key: "shareUrgent", label: "Is this urgent?", type: "radio", options: [option("Yes"), option("No")], showWhen: { field: "need", oneOf: ["Share transfer"] } },
      {
        key: "directorChangeType",
        label: "Type of change",
        type: "multicheck",
        options: [option("Appointment"), option("Resignation"), option("Both")],
        showWhen: { field: "need", oneOf: ["Director change"] },
      },
      {
        key: "shareholderChangeType",
        label: "Type of change",
        type: "multicheck",
        options: [option("New shareholder"), option("Removal of shareholder"), option("Change in shareholding percentages")],
        showWhen: { field: "need", oneOf: ["Shareholder change"] },
      },
      {
        key: "capitalChangeType",
        label: "Type of change",
        type: "radio",
        options: [option("Increase"), option("Reduction"), option("Reclassification")],
        showWhen: { field: "need", oneOf: ["Share capital change"] },
      },
      { key: "proposedName", label: "Proposed new company name (if known)", type: "text", showWhen: { field: "need", oneOf: ["Company name change"] } },
      { key: "amendmentNature", label: "Nature of amendment", type: "text", showWhen: { field: "need", oneOf: ["Memorandum / objects amendment"] } },
      {
        key: "restructureType",
        label: "Type of project",
        type: "radio",
        options: [
          option("Group restructuring"),
          option("Pre-merger structuring"),
          option("Cross-border merger"),
          option("Re-domiciliation (if applicable)"),
          option("Other"),
        ],
        showWhen: { field: "need", oneOf: ["Restructuring or merger"] },
      },
      { key: "restructureTypeOther", label: "Please specify", type: "text", showWhen: { field: "restructureType", oneOf: ["Other"] } },
      { key: "targetTimeline", label: "Target timeline?", type: "date", showWhen: { field: "need", oneOf: ["Restructuring or merger"] } },
      { key: "details", label: "Additional details", type: "textarea", placeholder: "Background, parties involved, dependencies, or constraints." },
    ],
  },
  {
    id: "Liquidation & Wind-down",
    label: "Liquidation & Wind-down",
    purpose: "Members' or Creditors' Voluntary Liquidation, company strike-off, or wind-down planning. Does not cover CSP or company structure changes.",
    fields: [
      {
        key: "need",
        label: "What do you need?",
        type: "radio",
        required: true,
        options: [
          option("Members' Voluntary Liquidation (MVL)"),
          option("Creditors' Voluntary Liquidation (CVL)"),
          option("Company strike-off (dormant or inactive company)"),
          option("Wind-down planning / advice"),
          option("Other"),
        ],
      },
      { key: "needOther", label: "Please specify", type: "text", showWhen: { field: "need", oneOf: ["Other"] } },
      { key: "solvent", label: "Is the company solvent?", type: "radio", options: [option("Yes"), option("No"), option("Not sure")], showWhen: { field: "need", oneOf: ["Members' Voluntary Liquidation (MVL)", "Creditors' Voluntary Liquidation (CVL)"] } },
      { key: "timeline", label: "Estimated timeline", type: "radio", options: [option("ASAP"), option("Flexible")], showWhen: { field: "need", oneOf: ["Members' Voluntary Liquidation (MVL)", "Creditors' Voluntary Liquidation (CVL)"] } },
      { key: "currentlyTrading", label: "Is the company currently trading?", type: "radio", options: [option("Yes"), option("No"), option("Not sure")], showWhen: { field: "need", oneOf: ["Company strike-off (dormant or inactive company)"] } },
      {
        key: "windDownSituation",
        label: "What best describes your situation?",
        type: "radio",
        options: [
          option("Company no longer operating"),
          option("Business restructuring"),
          option("Planned exit"),
          option("Other"),
        ],
        showWhen: { field: "need", oneOf: ["Wind-down planning / advice"] },
      },
      { key: "windDownOther", label: "Please specify", type: "text", showWhen: { field: "windDownSituation", oneOf: ["Other"] } },
      { key: "details", label: "Additional details", type: "textarea", placeholder: "Background, known deadlines, creditor considerations, or prior advice." },
    ],
  },
  {
    id: "One-off / Special Project",
    label: "One-off / Special Project",
    purpose: "Capture requests that do not fall under standard bookkeeping, VAT, payroll, audit, or corporate services. Intentionally flexible.",
    fields: [
      { key: "description", label: "Briefly describe what you need", type: "textarea", required: true, placeholder: "Nature of the request, what you are trying to achieve, and relevant background.", helperText: "Please describe the nature of the request, what you are trying to achieve, and any relevant background." },
      { key: "deadline", label: "Is there a deadline?", type: "date" },
      { key: "context", label: "Any additional context or constraints?", type: "textarea", placeholder: "Optional" },
    ],
  },
  {
    id: "Crypto Structuring & Wealth Positioning",
    label: "Crypto Structuring & Wealth Positioning",
    purpose: "Structured review and positioning of crypto holdings for lawful tax alignment, banking readiness, and risk management.",
    fields: [
      {
        key: "situation",
        label: "What best describes your situation?",
        type: "radio",
        required: true,
        options: [
          option("I hold crypto personally"),
          option("My company holds crypto"),
          option("Both personal and company exposure"),
          option("Transitioning from personal to structured holding"),
          option("Other"),
        ],
      },
      { key: "situationOther", label: "Please specify", type: "text", showWhen: { field: "situation", oneOf: ["Other"] } },
      {
        key: "activity",
        label: "Nature of crypto activity",
        type: "multicheck",
        options: [
          option("Long-term holding / investment"),
          option("Active trading"),
          option("Staking / yield generation"),
          option("Mining"),
          option("Token issuance"),
          option("Receiving crypto as business revenue"),
          option("Other"),
        ],
      },
      {
        key: "volume",
        label: "Approximate annual crypto volume",
        type: "radio",
        options: [
          option("Below €100,000"),
          option("€100,000 – €500,000"),
          option("€500,000 – €2M"),
          option("Above €2M"),
          option("Prefer not to disclose at this stage"),
        ],
      },
      {
        key: "issues",
        label: "Are you currently facing any of the following?",
        type: "multicheck",
        options: [
          option("Banking restrictions"),
          option("Tax uncertainty"),
          option("Compliance concerns"),
          option("Audit exposure"),
          option("No current issues"),
        ],
      },
      { key: "details", label: "Additional details (optional)", type: "textarea", placeholder: "Exchanges used, wallet structure, residency, or future plans." },
    ],
  },
  {
    id: "Grants & Incentives",
    label: "Grants & Incentives",
    purpose: "Assistance with identifying, preparing, or managing grant and incentive applications.",
    fields: [
      {
        key: "need",
        label: "What do you need?",
        type: "radio",
        required: true,
        options: [
          option("Identify available grants"),
          option("Prepare new grant application"),
          option("Review drafted application"),
          option("Post-approval compliance"),
          option("Reporting to authority"),
          option("Other"),
        ],
      },
      { key: "needOther", label: "Please specify", type: "text", showWhen: { field: "need", oneOf: ["Other"] } },
      {
        key: "focusArea",
        label: "Project focus area",
        type: "radio",
        required: true,
        options: [
          option("Digital transformation"),
          option("Innovation / R&D"),
          option("Business expansion"),
          option("Sustainability / ESG"),
          option("Employment / HR"),
          option("Internationalisation"),
          option("Other"),
        ],
      },
      { key: "focusOther", label: "Please specify", type: "text", showWhen: { field: "focusArea", oneOf: ["Other"] } },
      {
        key: "projectStage",
        label: "Project stage",
        type: "radio",
        options: [option("Idea stage"), option("Planning stage"), option("Implementation started"), option("Completed but not funded")],
      },
      {
        key: "budget",
        label: "Estimated project budget",
        type: "radio",
        options: [
          option("Below €50,000"),
          option("€50,000 – €250,000"),
          option("€250,000 – €1M"),
          option("Above €1M"),
          option("Not yet determined"),
        ],
      },
      { key: "grantReference", label: "Grant reference (if available)", type: "text", showWhen: { field: "need", oneOf: ["Post-approval compliance"] } },
      { key: "details", label: "Additional details", type: "textarea", placeholder: "Objectives, expected impact, timeline, or previous funding history." },
    ],
  },
  {
    id: "International Structuring",
    label: "International Structuring",
    purpose: "Cross-border structuring, international company setup, or group restructuring.",
    fields: [
      {
        key: "need",
        label: "What do you need?",
        type: "radio",
        required: true,
        options: [
          option("New international company setup"),
          option("Holding company structure"),
          option("Group restructuring"),
          option("Cross-border tax alignment"),
          option("Substance planning"),
          option("Other"),
        ],
      },
      { key: "needOther", label: "Please specify", type: "text", showWhen: { field: "need", oneOf: ["Other"] } },
      {
        key: "jurisdictions",
        label: "Jurisdictions involved",
        type: "multicheck",
        options: [option("Malta"), option("EU (other)"), option("UK"), option("Middle East"), option("Asia"), option("Other")],
      },
      { key: "jurisdictionsOther", label: "Please specify", type: "text", showWhen: { field: "jurisdictions", oneOf: ["Other"] } },
      { key: "existingStructure", label: "Is there an existing group structure?", type: "radio", options: [option("Yes"), option("No")] },
      { key: "structureDescription", label: "Briefly describe current structure", type: "textarea", showWhen: { field: "existingStructure", oneOf: ["Yes"] } },
      { key: "businessActivity", label: "Intended business activity", type: "text" },
      {
        key: "drivenBy",
        label: "Is this driven by",
        type: "radio",
        options: [
          option("Expansion"),
          option("Tax efficiency"),
          option("Investor requirement"),
          option("Regulatory requirement"),
          option("Operational restructuring"),
        ],
      },
      { key: "details", label: "Additional details", type: "textarea", placeholder: "Ownership structure, cross-border flows, governance, or banking objectives." },
    ],
  },
  {
    id: "Regulated Licensing",
    label: "Regulated Licensing",
    purpose: "Assistance with obtaining, maintaining, or reviewing regulated licences.",
    fields: [
      {
        key: "need",
        label: "What do you need?",
        type: "radio",
        required: true,
        options: [
          option("New licence application"),
          option("Licence renewal"),
          option("Licence variation"),
          option("Compliance review"),
          option("Regulatory reporting"),
          option("Other"),
        ],
      },
      { key: "needOther", label: "Please specify", type: "text", showWhen: { field: "need", oneOf: ["Other"] } },
      {
        key: "activityType",
        label: "Type of regulated activity",
        type: "radio",
        required: true,
        options: [
          option("Financial services"),
          option("Gaming"),
          option("Virtual assets"),
          option("Investment services"),
          option("Fund management"),
          option("Other regulated activity"),
        ],
      },
      { key: "activityOther", label: "Please specify", type: "text", showWhen: { field: "activityType", oneOf: ["Other regulated activity"] } },
      { key: "targetRegulator", label: "Target regulator (if known)", type: "text" },
      {
        key: "stage",
        label: "Stage of application",
        type: "radio",
        options: [
          option("Early planning"),
          option("Documentation preparation"),
          option("Submitted, awaiting review"),
          option("Ongoing licensed entity"),
        ],
      },
      {
        key: "requiredFor",
        label: "Is this licence required for",
        type: "radio",
        options: [
          option("New business"),
          option("Existing business expansion"),
          option("Investor requirement"),
          option("Regulatory regularisation"),
        ],
      },
      { key: "details", label: "Additional details", type: "textarea", placeholder: "Business model, expected timeline, regulator correspondence, or compliance challenges." },
    ],
  },
]

export const SERVICE_TYPE_OPTIONS = SERVICE_FORMS.map((s) => ({ value: s.id, label: s.label }))

export function getServiceForm(serviceId: string): ServiceFormConfig | undefined {
  return SERVICE_FORMS.find((s) => s.id === serviceId)
}
