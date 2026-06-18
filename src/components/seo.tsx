/**
 * Site-wide metadata constants.
 *
 * `SITE_URL` is used to build the absolute URLs that social/search crawlers
 * require for Open Graph image and url tags. Update it if the docs are ever
 * served from a different origin. `OG_IMAGE` is a single static image shared by
 * every page — swap in a dedicated 1200×630 banner here for richer previews.
 */
export const SITE_URL = 'https://docs.blux.cc';
export const SITE_NAME = 'BLUX';
export const SITE_DESCRIPTION = 'The complete wallet infrastructure for Stellar dApps.';
export const OG_IMAGE = `${SITE_URL}/favicon.png`;

export interface SeoProps {
  /** Page title from frontmatter; rendered in the document title as `BLUX - {title}`. */
  title?: string;
  /** Page description from frontmatter; falls back to the site description. */
  description?: string;
  /** Page path (e.g. `page.url`) used to build the absolute canonical/OG url. */
  path?: string;
  /** Hide the page from search engines — used for the not-found page. */
  noindex?: boolean;
}

/**
 * Per-page document metadata (title + Open Graph + Twitter card).
 *
 * Waku automatically hoists any `title`, `meta`, and `link` tags to the
 * document `<head>`, so rendering this component anywhere inside a page is
 * enough — no manual head management required.
 */
export function Seo({ title, description, path, noindex }: SeoProps) {
  const pageTitle = title ? `${SITE_NAME} - ${title}` : SITE_NAME;
  const desc = description ?? SITE_DESCRIPTION;
  const url = path ? `${SITE_URL}${path}` : SITE_URL;

  return (
    <>
      <title>{pageTitle}</title>
      <meta name="description" content={desc} />
      <link rel="canonical" href={url} />
      {noindex && <meta name="robots" content="noindex, nofollow" />}

      {/* Open Graph */}
      <meta property="og:type" content="website" />
      <meta property="og:site_name" content={SITE_NAME} />
      <meta property="og:title" content={pageTitle} />
      <meta property="og:description" content={desc} />
      <meta property="og:url" content={url} />
      <meta property="og:image" content={OG_IMAGE} />
      <meta property="og:image:alt" content={SITE_NAME} />

      {/* Twitter */}
      <meta name="twitter:card" content="summary" />
      <meta name="twitter:title" content={pageTitle} />
      <meta name="twitter:description" content={desc} />
      <meta name="twitter:image" content={OG_IMAGE} />
    </>
  );
}

export default Seo;
