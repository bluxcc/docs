import type { ReactNode } from "react";
import { Provider } from "@/components/provider";
import "@/styles/globals.css";

type RootElementProps = {
  children: ReactNode;
};

export default function RootElement({ children }: RootElementProps) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />

        <title>Blux Docs</title>
        <meta
          name="description"
          content="Documentation for integrating Blux authentication, Stellar wallets, SDKs, and APIs into your application."
        />
        <meta
          name="keywords"
          content="Blux, Stellar, authentication, wallet integration, SDK, API, React, TypeScript"
        />

        <meta name="author" content="Blux" />
        <meta name="application-name" content="Blux Docs" />
        <meta name="theme-color" content="#0c1083" />
        <meta name="color-scheme" content="dark light" />
        <meta
          name="robots"
          content="index,follow,max-image-preview:large,max-snippet:-1,max-video-preview:-1"
        />

        <link rel="canonical" href="https://docs.blux.cc/" />
        <link
          rel="alternate"
          type="text/markdown"
          title="LLM"
          href="https://docs.blux.cc/llms.txt"
        />
        <link
          rel="alternate"
          type="text/markdown"
          title="LLM (full)"
          href="https://docs.blux.cc/llms-full.txt"
        />
        <link rel="icon" href="/favicon.png" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/site.webmanifest" />

        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="Blux Docs" />
        <meta property="og:title" content="Blux Docs" />
        <meta
          property="og:description"
          content="Learn how to add Blux authentication and Stellar wallet support to your application."
        />
        <meta property="og:url" content="https://docs.blux.cc/" />
        <meta property="og:image" content="https://docs.blux.cc/og-image.png" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:image:alt" content="Blux Docs" />
        <meta property="og:locale" content="en_US" />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Blux Docs" />
        <meta
          name="twitter:description"
          content="Learn how to integrate Blux authentication, wallets, SDKs, and APIs."
        />
        <meta
          name="twitter:image"
          content="https://docs.blux.cc/og-image.png"
        />
        <meta name="twitter:creator" content="@bluxcc" />

        <meta name="format-detection" content="telephone=no" />
      </head>

      <body data-version="1.0">
        <Provider>{children}</Provider>
      </body>
    </html>
  );
}

export const getConfig = async () =>
  ({
    render: "static",
  }) as const;
