import { unstable_notFound } from "waku/router/server";
import { getLLMText, textResponse } from "@/lib/llms";
import { source } from "@/lib/source";

export async function GET() {
  const page = source.getPage([]) ?? source.getPage(undefined);

  if (!page) {
    unstable_notFound();
  }

  return textResponse(await getLLMText(page));
}

export async function getConfig() {
  return {
    render: "static" as const,
  } as const;
}
