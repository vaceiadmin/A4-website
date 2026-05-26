/**
 * Single source of truth for service overview/card images.
 * Used by: Homepage ServicesSection, service detail page (ServiceOverview).
 * - Override map: services with custom images in /assets/images/services/
 * - Else: use image from servicesData (service.image)
 * - Else: fallback placeholder
 */

export const FALLBACK_SERVICE_IMAGE = "/assets/images/placeholder.png";

/** Service id -> image path (only for services that have a dedicated image in assets/images/services) */
export const SERVICE_IMAGE_MAP: Record<string, string> = {
  // Core accounting / audit / tax services
  "accounting-finance": "/assets/images/services/Accounting.jpeg",
  "tax-compliance": "/assets/images/services/tax_and_compliance.jpeg",
  "audit-assurance": "/assets/images/services/audit_and_assurance.jpeg",

  // Existing mapped services
  "liquidation-wind-down": "/assets/images/services/liquidation.jpeg",
  "company-structure-corporate-changes":
    "/assets/images/services/company_structure_and_corporate_changes.jpeg",
  "advisory-growth": "/assets/images/services/advisory_and_growth.jpeg",
  "regulated-licensing": "/assets/images/services/regulating_and_license.jpeg",
  "corporate-csp-services":
    "/assets/images/services/Corporate&CSPServices.jpeg",

  // Newly provided dedicated images (previously using fallback)
  "crypto-digital-assets": "/assets/images/services/crypto_services.jpeg",
  "banking-payments-support":
    "/assets/images/services/banking_and_payment_support.jpeg",
  "audit-readiness": "/assets/images/services/audit_readiness.jpeg",
  "group-consolidation":
    "/assets/images/services/group_and_consolidation.jpeg",
  "corporate-transactions":
    "/assets/images/services/corporate_transaction.jpeg",
  "international-business-structuring-expansion":
    "/assets/images/services/internation_business_structuring_and _expansion.jpeg",
};

export function getServiceImage(
  serviceId: string,
  defaultImage?: string | null
): string {
  return (
    SERVICE_IMAGE_MAP[serviceId] ||
    defaultImage ||
    FALLBACK_SERVICE_IMAGE
  );
}
