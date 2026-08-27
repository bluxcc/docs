import { buildLlmsIndex, textResponse } from "@/lib/llms";

export function GET() {
  return textResponse(buildLlmsIndex());
}

export async function getConfig() {
  return {
    render: "static" as const,
  } as const;
}
