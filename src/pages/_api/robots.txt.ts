import { SITE_URL } from "@/components/seo";

const BODY = `User-agent: *
Allow: /

# Default documentation for AI agents (https://llmstxt.org):
# ${SITE_URL}/llms.txt
# ${SITE_URL}/llms-full.txt
`;

export function GET() {
  return new Response(BODY, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
    },
  });
}

export async function getConfig() {
  return {
    render: "static" as const,
  } as const;
}
