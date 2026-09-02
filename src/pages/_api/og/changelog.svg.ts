import template from '@/assets/og-changelog-template.svg?raw';

function changelogSvg(version: string): string {
  return template.replace('{{VERSION_NUMBER}}', version.replace(/^v/, ''));
}

export function GET(request: Request) {
  const requestedVersion = new URL(request.url).searchParams.get('version') ?? 'latest';
  const version = /^v?\d+\.\d+\.\d+(?:[-+][\w.-]+)?$/.test(requestedVersion)
    ? requestedVersion.startsWith('v') ? requestedVersion : `v${requestedVersion}`
    : 'latest';

  return new Response(changelogSvg(version), {
    headers: {
      'Cache-Control': 'public, max-age=31536000, immutable',
      'Content-Type': 'image/svg+xml; charset=utf-8',
    },
  });
}
