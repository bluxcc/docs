import type { ApiContext } from "waku/router";
import { unstable_notFound } from "waku/router/server";
import { getLLMText, textResponse } from "@/lib/llms";
import { source } from "@/lib/source";

export async function GET(
  _request: Request,
  { params }: ApiContext<"/llms.mdx/[...slugs]">,
) {
  const slugs = params.slugs;
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
