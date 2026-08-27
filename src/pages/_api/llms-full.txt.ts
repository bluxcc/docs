import { buildLlmsFull, textResponse } from "@/lib/llms";

export async function GET() {
  return textResponse(await buildLlmsFull());
}

export async function getConfig() {
  return {
    render: "static" as const,
  } as const;
}
