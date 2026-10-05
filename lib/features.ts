/**
 * Content flags read at build/render time on the server.
 * FEATURE_LICITACOES: the Brazilian public tender text needs legal review before it goes live.
 */
export const features = {
  licitacoes: process.env.FEATURE_LICITACOES === "true",
};
