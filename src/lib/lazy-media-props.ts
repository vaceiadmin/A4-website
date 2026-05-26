/** Shared attributes for below-the-fold GIFs / large images */
export const lazyImgProps = {
  loading: "lazy" as const,
  decoding: "async" as const,
  fetchPriority: "low" as const,
};
