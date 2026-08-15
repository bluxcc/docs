# Blux Documentation

The source for the official [Blux documentation](https://docs.blux.cc/).

Blux provides authentication and wallet infrastructure for Stellar dApps. These docs cover getting started with Blux, JavaScript and React integration, project configuration, dashboard features, and the Blux API.

## Links

- **Documentation:** [docs.blux.cc](https://docs.blux.cc/)
- **Website:** [blux.cc](https://blux.cc/)
- **Live Demo:** [demo.blux.cc](https://demo.blux.cc/)
- **Dashboard:** [dashboard.blux.cc](https://dashboard.blux.cc/)
- **Core SDK:** [github.com/bluxcc/core](https://github.com/bluxcc/core)

## Documentation Sections

- Getting started
- JavaScript integration
- React integration
- Configuration
- Dashboard
- API reference

Documentation pages are written in MDX and stored in the [`content`](./content) directory.

## Tech Stack

- [Waku](https://waku.gg/)
- [Fumadocs](https://fumadocs.dev/)
- [React](https://react.dev/)
- [TypeScript](https://www.typescriptlang.org/)
- [Tailwind CSS](https://tailwindcss.com/)

## Getting Started

### Prerequisites

- Node.js 24 is recommended to match the repository's Docker environment.
- npm, pnpm, or Yarn

### Clone the Repository

```sh
git clone https://github.com/bluxcc/docs.git
cd docs
```

### Install Dependencies

Using npm:

```sh
npm install --legacy-peer-deps
```

Using pnpm:

```sh
pnpm install
```

Using Yarn:

```sh
yarn install
```

### Start the Development Server

```sh
npm run dev
```

Or:

```sh
pnpm dev
```

```sh
yarn dev
```

Open the local URL shown in your terminal. Changes to the source files and MDX content are reflected during development.

## Available Scripts

| Command | Description |
| --- | --- |
| `npm run dev` | Starts the Waku development server. |
| `npm run build` | Creates a production build. |
| `npm start` | Starts the production server. |
| `npm run types:check` | Generates Fumadocs MDX types and runs TypeScript checks. |
| `npm run lint` | Checks the project with Biome. |
| `npm run format` | Formats the project with Biome. |

The equivalent `pnpm` or Yarn commands can also be used.

## Project Structure

```text
content/
├── api/              # API reference
├── configuration/    # Project and SDK configuration
├── dashboard/        # Blux Dashboard documentation
├── javascript/       # JavaScript and Blux Core guides
├── react/            # React SDK guides
├── getting-started.mdx
├── index.mdx
└── meta.json         # Top-level navigation configuration

public/                # Static assets
src/                   # Documentation application source
source.config.ts       # Fumadocs content configuration
waku.config.ts         # Waku application configuration
```

## Editing the Documentation

1. Find the relevant section inside [`content`](./content).
2. Edit an existing `.mdx` file or add a new one.
3. Update the section's `meta.json` when adding, removing, or reordering navigation entries.
4. Run the validation commands before submitting your changes.

```sh
npm run types:check
npm run lint
```

To apply the repository's formatting rules:

```sh
npm run format
```

## Production Build

Create a production build:

```sh
npm run build
```

Start the production server:

```sh
npm start
```

## Docker

Build and run the documentation site with Docker Compose:

```sh
docker compose up --build
```

The Compose configuration exposes the site at [http://localhost:3181](http://localhost:3181).

To run the Docker image directly:

```sh
docker build -t blux-docs .
docker run --rm -p 8080:8080 blux-docs
```

The site will be available at [http://localhost:8080](http://localhost:8080).

## Contributing

Contributions that improve accuracy, examples, and clarity are welcome. Before opening a pull request, make sure the documentation builds successfully and passes the type and lint checks.

When documenting SDK behavior, keep code examples aligned with the current Blux packages and avoid documenting unreleased functionality as available.

## Support

For documentation questions, integration support, or other inquiries:

- **Email:** [support@blux.cc](mailto:support@blux.cc)
- **X:** [@BluxOfficial](https://x.com/BluxOfficial)

