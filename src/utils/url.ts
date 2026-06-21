const base = import.meta.env.BASE_URL;
const productionOrigin = 'https://habitatlane.org';
const externalProductionPaths = new Set(['/restore/']);

export const withBase = (href: string): string => {
  if (href.startsWith(productionOrigin)) {
    const url = new URL(href);
    if (!externalProductionPaths.has(url.pathname)) {
      return withBase(`${url.pathname}${url.search}${url.hash}`);
    }
  }

  if (
    !href.startsWith('/') ||
    href.startsWith('//') ||
    href.startsWith(base)
  ) {
    return href;
  }

  const normalizedBase = base.endsWith('/') ? base.slice(0, -1) : base;
  return href === '/' ? `${normalizedBase}/` : `${normalizedBase}${href}`;
};

export const pathWithoutBase = (pathname: string) => {
  if (base === '/') {
    return pathname;
  }

  const normalizedBase = base.endsWith('/') ? base.slice(0, -1) : base;
  if (pathname === normalizedBase) {
    return '/';
  }

  return pathname.startsWith(`${normalizedBase}/`)
    ? pathname.slice(normalizedBase.length)
    : pathname;
};
