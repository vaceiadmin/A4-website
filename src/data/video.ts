export const SERVICE_VIDEOS_BASE_PATH = "/assets/videos";
const SERVICES_PATH = "/assets/videos/services";

/** Hero section - Main Render.gif as primary visual */
export const HERO_MAIN_GIF = `${SERVICE_VIDEOS_BASE_PATH}/Main Render.gif`;

/** How It Works section - A4 (2) X2V2.mp4, no poster */
export const HOW_IT_WORKS_VIDEO = `${SERVICE_VIDEOS_BASE_PATH}/A4 (2) X2V2.mp4`;

/** Insights & Resources home section — YouTube IDs for the inline gallery (order matches `insightsResources.videoPlaylist` in locale `home.json`) */
export const INSIGHTS_RESOURCES_YOUTUBE_IDS = [
  "DaI1KCACrDU",
  "Um5C34Iblfs",
] as const;

export function youtubeThumbUrl(videoId: string): string {
  return `https://i.ytimg.com/vi/${videoId}/mqdefault.jpg`;
}

export function youtubeEmbedUrl(videoId: string, autoplay = true): string {
  const q = autoplay ? "?autoplay=1" : "";
  return `https://www.youtube.com/embed/${videoId}${q}`;
}

// Maps each service ID to its GIF in public/assets/videos/services
export const serviceVideosById: Record<string, string | undefined> = {
  "accounting-finance": `${SERVICES_PATH}/Accounting%20%26%20Bookkeeping_X1V1.gif`,
  "tax-compliance": `${SERVICES_PATH}/V17-VAT%20Return.gif`,
  "audit-assurance": `${SERVICES_PATH}/Audit_Service_V1%281%29.gif`,
  "corporate-csp-services": `${SERVICES_PATH}/Corporate%20%26%20CSP%20Services.gif`,
  "regulated-licensing": `${SERVICES_PATH}/CFO%20%26%20Management%20Reporting.gif`,
  "advisory-growth": `${SERVICES_PATH}/CFO%20%26%20Management%20Reporting.gif`,
  "company-structure-corporate-changes": `${SERVICES_PATH}/V10-Corporate%20Transactions.gif`,
  "liquidation-wind-down": undefined, // no matching gif
  "international-business-structuring-expansion": `${SERVICES_PATH}/Internation%20Structuring.gif`,
  "crypto-digital-assets": `${SERVICES_PATH}/Crypto%20Service.gif`,
  "audit-readiness": `${SERVICES_PATH}/V16-Audit%20Rediness.gif`,
  "group-consolidation": `${SERVICES_PATH}/Group%20%26%20Consolidate.gif`,
  "banking-payments-support": `${SERVICES_PATH}/V9-Banking%20%26%20Payments%20Support.gif`,
  "corporate-transactions": `${SERVICES_PATH}/V10-Corporate%20Transactions.gif`,
};

export const getServiceVideoById = (id: string): string | undefined =>
  serviceVideosById[id];

