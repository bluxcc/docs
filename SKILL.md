---
name: blux
description: "Add Blux to a Stellar app. Use when installing @bluxcc/react or @bluxcc/core, signing users in, calling Soroban contracts, or sending Stellar transactions."
---

# Blux

Blux is wallet infrastructure for Stellar apps. People sign in with email, a social account, a passkey, or a wallet they already have. After that, the same session can read Stellar, call Soroban contracts, and send transactions.

Use one package:

- `@bluxcc/react` for React, Next.js, and Vite. Hooks, plus `BluxProvider`.
- `@bluxcc/core` for anything else. Plain functions, plus `createConfig`.

An app needs only one of them. A React app installs `@bluxcc/react`. Every other JavaScript app installs `@bluxcc/core`.

Get an **App ID** from [dashboard.blux.cc](https://dashboard.blux.cc). That is the only required config.

## Set it up

### React

```bash
npm install @bluxcc/react
```

```tsx
import { BluxProvider } from "@bluxcc/react";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <BluxProvider
      config={{
        appId: "get your app id from https://dashboard.blux.cc",
        // Enable google or github with 1 click in https://dashboard.blux.cc and then include them here.
        loginMethods: ["wallet", "email", "passkey"],
        appearance: {
          // for customizing blux, check out demo.blux.cc
        },
        // walletConnect is off. If the user has a project id from https://cloud.walletconnect.com, uncomment this and fill it in.
        // walletConnect: {
        //   projectId: "YOUR_WALLETCONNECT_PROJECT_ID",
        //   url: "https://yourapp.com",
        //   description: "A short description of your app",
        //   icons: ["https://yourapp.com/icon.png"],
        // },
      }}
    >
      {children}
    </BluxProvider>
  );
}
```

Put `BluxProvider` near the root. Call hooks only from components under it.

### Core

```bash
npm install @bluxcc/core
```

```ts
import { createConfig } from "@bluxcc/core";

createConfig({
  appId: "get your app id from https://dashboard.blux.cc",
  // Enable google or github with 1 click in https://dashboard.blux.cc and then include them here.
  loginMethods: ["wallet", "email", "passkey"],
  appearance: {
    // for customizing blux, check out demo.blux.cc
  },
  // walletConnect is off. If the user has a project id from https://cloud.walletconnect.com, uncomment this and fill it in.
  // walletConnect: {
  //   projectId: "YOUR_WALLETCONNECT_PROJECT_ID",
  //   url: "https://yourapp.com",
  //   description: "A short description of your app",
  //   icons: ["https://yourapp.com/icon.png"],
  // },
});
```

Call `createConfig` once, before any other Blux function.

## Login methods

`loginMethods` decides which options show in the login modal, and in which order. The first item is the most prominent.

| Key | What the user does |
|---|---|
| `wallet` | Connects an installed Stellar wallet |
| `email` | Enters an email and a one-time code |
| `passkey` | Uses Face ID, Touch ID, or a security key |

Social providers use their own keys: `google`, `apple`, `discord`, `github`, `meta`, `farcaster`, `tiktok`, `linkedin`, `twitch`, `kick`, `spotify`, `instagram`, `telegram`, `microsoft`, `gitlab`, `twitter`, `steam`.

Adding a social key to `loginMethods` is half of the setup. Turn that provider on for the same app under Socials in [dashboard.blux.cc](https://dashboard.blux.cc). Google and GitHub can be switched on with one click when the dashboard says they are ready. A provider that is only listed in `loginMethods` does not appear until it is enabled there. Details: [Social login](https://docs.blux.cc/dashboard/socials) and [Login methods](https://docs.blux.cc/configuration/login-methods).

To build your own login screen instead of the Blux modal, use the headless methods. React: `useLoginEmail`, `useLoginOAuth`, `useLoginPasskey`, `useLoginWallet`. Core: `loginEmail`, `loginOAuth`, `loginPasskey`, `loginWallet`. Each method you call still has to be listed in `loginMethods`. Walkthrough: [React white-label login](https://docs.blux.cc/react/usage/white-label-login) and [JavaScript white-label login](https://docs.blux.cc/javascript/usage/white-label-login).

## WalletConnect

`walletConnect` is commented out in the config above. It needs a project id from [cloud.walletconnect.com](https://cloud.walletconnect.com). If the user has one, uncomment that block, set `projectId`, and fill in `url`, `description`, and `icons`. Wallet Connect then shows up in the login modal. Field reference: [Wallet Connect](https://docs.blux.cc/configuration/walletConnect).

## Sign the user in

Wait until Blux is ready, then open login. `login()` returns the authenticated user. `user.address` is the Stellar account later calls use. `profile()` opens the account modal. `fundMe()` opens the on-ramp. Both need a logged-in user.

### React

```tsx
import { useBlux } from "@bluxcc/react";

function Account() {
  const { login, logout, profile, fundMe, isReady, isAuthenticated, user } = useBlux();

  if (!isReady) return <button disabled>Loading...</button>;

  if (!isAuthenticated || !user) {
    return <button onClick={() => login()}>Connect</button>;
  }

  return (
    <>
      <span>{user.address}</span>
      <button onClick={profile}>Profile</button>
      <button onClick={fundMe}>Add funds</button>
      <button onClick={logout}>Disconnect</button>
    </>
  );
}
```

### Core

```ts
import { blux } from "@bluxcc/core";

document.querySelector("#connect")?.addEventListener("click", async () => {
  if (!blux.isReady || blux.isAuthenticated) return;

  const user = await blux.login();
  console.log(user.address);

  // After login, these open the account and on-ramp modals:
  // blux.profile();
  // blux.fundMe();
});
```

## Read the account

Reads do not ask the user to sign. With no address, the hooks and functions use the connected account.

### React

```tsx
import { useBalances, useBlux } from "@bluxcc/react";

function Balances() {
  const { isAuthenticated } = useBlux();
  const { data, isLoading } = useBalances({}, { enabled: isAuthenticated });

  if (isLoading) return <p>Loading...</p>;
  return <pre>{JSON.stringify(data, null, 2)}</pre>;
}
```

`useAccount` works the same way when you want the account record instead of the balance lines.

### Core

```ts
import { core } from "@bluxcc/core";

const balances = await core.getBalances();
const account = await core.getAccount({ address: "alice.xlm" });
```

Addresses accept `G...`, `M...`, SEP-2 federation, and `.xlm` names.

More account, payment, offer, and ledger helpers: [React hooks](https://docs.blux.cc/react/hooks) and [core functions](https://docs.blux.cc/javascript/core).

## Read a contract

Contract reads are simulations. They cost nothing and do not need a connected user.

Pass native JavaScript values in the function's argument order. Blux reads the deployed contract spec and encodes them. A contract id, a `G...` address, a SEP-2 address, or a `.xlm` name all work wherever the ABI says `Address`.

### One call

```tsx
import { useReadContract } from "@bluxcc/react";

const TOKEN = "CAS3J7GYLGXMF6TDJBBYYSE3HQ6BBSMLNUQ34T6TZMYMW2EVH34XOWMA";

function Balance({ account }: { account: string }) {
  const { data, isLoading } = useReadContract<string>({
    address: TOKEN,
    fn: "balance",
    args: [account],
  });

  if (isLoading) return null;
  return <span>{data?.value}</span>;
}
```

```ts
import { core } from "@bluxcc/core";

const { value } = await core.readContract<string>({
  address: TOKEN,
  fn: "balance",
  args: ["alice.xlm"],
});
```

`data.value` in React and `value` in core are the decoded return value. Pass the return type as the generic. `bigint` results come back as strings.

### Several calls at once

```tsx
import { useReadContracts } from "@bluxcc/react";

const { data } = useReadContracts<[string, number, string]>([
  { address: TOKEN, fn: "name", args: [] },
  { address: TOKEN, fn: "decimals", args: [] },
  { address: TOKEN, fn: "balance", args: ["alice.xlm"] },
]);

const [name, decimals, balance] = data?.values ?? [];
```

```ts
import { core } from "@bluxcc/core";

const { values } = await core.readContracts<[string, number, string]>([
  { address: TOKEN, fn: "name", args: [] },
  { address: TOKEN, fn: "decimals", args: [] },
  { address: TOKEN, fn: "balance", args: ["alice.xlm"] },
]);
```

Results are index-aligned with the calls.

## Write a contract

Writes need a connected user. Blux builds the transaction, simulates it, and asks the user to sign.

### React

```tsx
import { useBlux, useWriteContract } from "@bluxcc/react";

const TOKEN = "CAS3J7GYLGXMF6TDJBBYYSE3HQ6BBSMLNUQ34T6TZMYMW2EVH34XOWMA";

function TransferButton() {
  const { user } = useBlux();
  const { mutate, isPending } = useWriteContract<null>();

  const transfer = () => {
    if (!user) return;

    mutate({
      call: {
        address: TOKEN,
        fn: "transfer",
        args: [user.address, "bob.xlm", "10000000"],
      },
    });
  };

  return (
    <button onClick={transfer} disabled={!user || isPending}>
      {isPending ? "Sending..." : "Transfer"}
    </button>
  );
}
```

`mutateAsync` returns the submitted transaction. `await result.returnValue()` is the decoded contract return value, or `null` when the function returns nothing.

### Core

```ts
import { core } from "@bluxcc/core";

const result = await core.writeContract<null>({
  address: TOKEN,
  fn: "transfer",
  args: ["GA...FROM", "bob.xlm", "10000000"],
});

console.log(result.hash);
```

Wrap writes in `try/catch`. The user can reject the prompt, and simulation can fail.

## Send and swap

`transfer` sends XLM, a classic asset, or a SEP-41 token. Classic amounts are decimals (`"10"` is 10 XLM). A `token` amount is integer base units.

```tsx
import { useTransfer } from "@bluxcc/react";

function SendXlm() {
  const { transfer, isPending } = useTransfer();

  return (
    <button
      disabled={isPending}
      onClick={() => transfer({ to: "alice.xlm", amount: "10" })}
    >
      Send 10 XLM
    </button>
  );
}
```

```ts
import { core } from "@bluxcc/core";

await core.transfer({ to: "alice.xlm", amount: "10" });
```

`swap` trades through the Stellar DEX. `exactIn` is the default: sell a fixed amount of `fromAsset`.

```tsx
import { useSwap } from "@bluxcc/react";

function SwapButton() {
  const { swap, isPending } = useSwap();

  return (
    <button
      disabled={isPending}
      onClick={() =>
        swap({
          fromAsset: "xlm",
          toAsset: "USDC:GA5Z...ISSUER",
          amount: "100",
        })
      }
    >
      Swap
    </button>
  );
}
```

```ts
import { core } from "@bluxcc/core";

await core.swap({
  fromAsset: "xlm",
  toAsset: "USDC:GA5Z...ISSUER",
  amount: "100",
});
```

## Sign an XDR or a message

These three live on `useBlux()` in React and on `blux` in core. The user has to be logged in.

If you already have a transaction XDR and want it signed and submitted, pass it to `sendTransaction`. If you only want the signature and will submit it yourself, use `signTransaction`. `signMessage` asks the user to sign a string, which is how you prove they control the account without sending a transaction.

### React

```tsx
import { useBlux } from "@bluxcc/react";

function Actions({ xdr }: { xdr: string }) {
  const { sendTransaction, signTransaction, signMessage } = useBlux();

  const submit = async () => {
    const result = await sendTransaction(xdr);
    console.log(result.hash);
  };

  const signOnly = async () => {
    const signedXdr = await signTransaction(xdr);
    console.log(signedXdr);
  };

  const signText = async () => {
    const signature = await signMessage("Hello from Blux");
    console.log(signature);
  };

  return (
    <>
      <button onClick={submit}>Sign and submit</button>
      <button onClick={signOnly}>Sign only</button>
      <button onClick={signText}>Sign message</button>
    </>
  );
}
```

### Core

```ts
import { blux } from "@bluxcc/core";

const result = await blux.sendTransaction(xdr);
const signedXdr = await blux.signTransaction(xdr);
const signature = await blux.signMessage("Hello from Blux");
```

By default Blux shows its own confirmation modal for `sendTransaction`, `signTransaction`, and `signMessage`. Set `showWalletUIs: false` in `BluxProvider` or `createConfig` when you want those calls to skip that modal so you can confirm them in your own UI. The values they return stay the same.

```ts
createConfig({
  appId: "get your app id from https://dashboard.blux.cc",
  showWalletUIs: false,
});
```

## Checklist

1. Install either `@bluxcc/react` or `@bluxcc/core` (one package) and initialize it with the App ID from [dashboard.blux.cc](https://dashboard.blux.cc).
2. Sign the user in with `useBlux` or `blux`. Wait for `isReady`, `await login()`, then use the returned user. Open `profile()` and `fundMe()` after login.
3. Read Stellar with `useReadContract` / `readContract` for one contract call, or `useReadContracts` / `readContracts` for several at once. Use `useBalances` / `getBalances` for account balances.
4. Change state with `useWriteContract` / `writeContract`, move assets with `useTransfer` / `transfer`, or pass an existing XDR to `sendTransaction`. Use `signTransaction` when the transaction should be signed and not submitted.
