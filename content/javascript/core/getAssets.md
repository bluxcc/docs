---
title: Get Assets
description: Fetch a paginated list of Stellar assets using the Blux core SDK.
---

The `getAssets` function returns a paginated list of Stellar assets.

The return value contains two properties:
- `response` — the asset records you can use directly
- `builder` — exposes `next()` and `prev()` to paginate through results

## Type
```tsx
export type CallBuilderOptions = {
  cursor?: string;
  limit?: number;
  network?: string;
  order?: "asc" | "desc";
};

type GetAssetsOptions = CallBuilderOptions & {
  forCode?: string;
  forIssuer?: string;
};

type GetAssetsResult = {
  builder: AssetsCallBuilder;
  response: Horizon.ServerApi.CollectionPage<Horizon.ServerApi.AssetRecord>;
};
```

## Usage
```typescript
import { core } from "@bluxcc/core";

const result = await core.getAssets({});
```