import { readFile } from "node:fs/promises";
import type { InferPageType } from "fumadocs-core/source";
import { SITE_DESCRIPTION, SITE_URL, toMarkdownUrl } from "@/components/seo";
import { source } from "@/lib/source";

export type DocsPage = InferPageType<typeof source>;
type PageTree = ReturnType<typeof source.getPageTree>;
type PageTreeNode = PageTree["children"][number];

const MARKDOWN_HEADERS = {
  "Content-Type": "text/markdown; charset=utf-8",
  Vary: "Accept",
};

export function textResponse(body: string): Response {
  return new Response(body, { headers: MARKDOWN_HEADERS });
}

function stringifyName(name: unknown): string {
  if (typeof name === "string" || typeof name === "number") {
    return String(name);
  }

  if (Array.isArray(name)) {
    return name.map(stringifyName).filter(Boolean).join("");
  }

  return "";
}

function toAbsoluteUrl(url: string): string {
  if (!url || url === "/") {
    return `${SITE_URL}/`;
  }

  return `${SITE_URL}${url}`;
}

function pagesByUrl(): Map<string, DocsPage> {
  return new Map(source.getPages().map((page) => [page.url, page]));
}

function pageLink(url: string, pages: Map<string, DocsPage>): string {
  const page = pages.get(url);
  const title = page?.data.title ?? url;
  const description = page?.data.description;
  const href = toMarkdownUrl(url);

  return description
    ? `- [${title}](${href}): ${description}`
    : `- [${title}](${href})`;
}

function walkTree(
  nodes: PageTreeNode[],
  pages: Map<string, DocsPage>,
  lines: string[],
  depth: number,
): void {
  for (const node of nodes) {
    if (node.type === "separator") {
      continue;
    }

    if (node.type === "folder") {
      const name = stringifyName(node.name);
      if (name) {
        const heading = depth <= 1 ? `## ${name}` : `### ${name}`;
        lines.push("", heading, "");
      }

      if (node.index) {
        lines.push(pageLink(node.index.url, pages));
      }

      walkTree(node.children, pages, lines, depth + 1);
      continue;
    }

    lines.push(pageLink(node.url, pages));
  }
}

export function buildLlmsIndex(): string {
  const pages = pagesByUrl();
  const tree = source.getPageTree();
  const lines: string[] = [
    "# Blux Documentation",
    "",
    `> ${SITE_DESCRIPTION}`,
    "",
    "This is the default documentation entry for AI agents. Start here, then follow the Markdown links. Use `/llms-full.txt` when you need the entire corpus in one fetch. HTML docs for humans live at https://docs.blux.cc/.",
    "",
    "## Docs",
    "",
  ];

  walkTree(tree.children, pages, lines, 1);

  lines.push(
    "",
    "## Optional",
    "",
    `- [Full documentation](${SITE_URL}/llms-full.txt): Complete Blux docs in a single Markdown file for LLM ingestion.`,
  );

  return `${lines
    .join("\n")
    .replace(/\n{3,}/g, "\n\n")
    .trim()}\n`;
}

function stripMdx(raw: string): string {
  let text = raw;

  if (text.startsWith("---")) {
    const end = text.indexOf("\n---", 3);
    if (end !== -1) {
      text = text.slice(end + 4);
    }
  }

  const lines = text.split("\n");
  const kept: string[] = [];
  let skippingImport = false;

  for (const line of lines) {
    if (skippingImport) {
      if (/;\s*$/.test(line)) {
        skippingImport = false;
      }
      continue;
    }

    if (/^import\s/.test(line)) {
      if (!/;\s*$/.test(line)) {
        skippingImport = true;
      }
      continue;
    }

    kept.push(line);
  }

  return kept
    .join("\n")
    .replace(/\n{3,}/g, "\n\n")
    .trim();
}

export async function getLLMText(page: DocsPage): Promise<string> {
  const header = [
    `# ${page.data.title}`,
    "",
    `URL: ${toAbsoluteUrl(page.url)}`,
  ];

  if (page.data.description) {
    header.push("", page.data.description);
  }

  if (!page.absolutePath) {
    return header.join("\n");
  }

  try {
    const body = stripMdx(await readFile(page.absolutePath, "utf8"));
    if (body) {
      header.push("", body);
    }
  } catch {
    // Fall back to title + description when the source file cannot be read.
  }

  return header.join("\n");
}

function collectPages(
  nodes: PageTreeNode[],
  pages: Map<string, DocsPage>,
  ordered: DocsPage[],
  seen: Set<string>,
): void {
  for (const node of nodes) {
    if (node.type === "separator") {
      continue;
    }

    if (node.type === "folder") {
      if (node.index) {
        const page = pages.get(node.index.url);
        if (page && !seen.has(page.url)) {
          seen.add(page.url);
          ordered.push(page);
        }
      }

      collectPages(node.children, pages, ordered, seen);
      continue;
    }

    const page = pages.get(node.url);
    if (page && !seen.has(page.url)) {
      seen.add(page.url);
      ordered.push(page);
    }
  }
}

export async function buildLlmsFull(): Promise<string> {
  const pages = pagesByUrl();
  const ordered: DocsPage[] = [];
  const seen = new Set<string>();

  collectPages(source.getPageTree().children, pages, ordered, seen);

  for (const page of source.getPages()) {
    if (!seen.has(page.url)) {
      ordered.push(page);
    }
  }

  const sections = await Promise.all(ordered.map(getLLMText));
  return `${sections.join("\n\n---\n\n")}\n`;
}
