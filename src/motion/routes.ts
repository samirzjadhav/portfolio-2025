export const PAGE_ROUTE_ORDER = [
  "/",
  "/projects",
  "/github",
  "/resume",
] as const;

export type PageRoute = (typeof PAGE_ROUTE_ORDER)[number];

export function getRouteIndex(pathname: string): number {
  const index = PAGE_ROUTE_ORDER.indexOf(pathname as PageRoute);
  return index === -1 ? 0 : index;
}
