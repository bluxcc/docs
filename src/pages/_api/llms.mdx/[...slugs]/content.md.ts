import type { ApiContext } from "waku/router";
import { unstable_notFound } from "waku/router/server";
import { getLLMText, textResponse } from "@/lib/llms";
import { source } from "@/lib/source";

const MARKDOWN_PREFIX = "/llms.mdx/";
const MARKDOWN_SUFFIX = "/content.md";

/**
 * Waku SSG invokes static API handlers with `params: {}`, so slug
 * catch-alls must be recovered from the request pathname.
 */
function slugsFromRequest(
  request: Request,
  params: ApiContext<"/llms.mdx/[...slugs]/content.md">["params"],
): string[] {
  if (Array.isArray(params.slugs) && params.slugs.length > 0) {
    return params.slugs;
  }

  const pathname = new URL(request.url).pathname;
  if (
    !pathname.startsWith(MARKDOWN_PREFIX) ||
    !pathname.endsWith(MARKDOWN_SUFFIX)
  ) {
    return [];
  }

  return pathname
    .slice(MARKDOWN_PREFIX.length, -MARKDOWN_SUFFIX.length)
    .split("/")
    .filter(Boolean);
}

export async function GET(
  request: Request,
  { params }: ApiContext<"/llms.mdx/[...slugs]/content.md">,
) {
  const slugs = slugsFromRequest(request, params);
  const page = source.getPage(slugs);

  if (!page) {
    unstable_notFound();
  }

  return textResponse(await getLLMText(page));
}

export async function getConfig() {
  const pages = source
    .generateParams()
    .map((item) => (item.lang ? [item.lang, ...item.slug] : item.slug))
    .filter((slug) => slug.length > 0);

  return {
    render: "static" as const,
    staticPaths: pages,
  } as const;
}
