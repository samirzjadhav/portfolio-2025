import { useEffect } from "react";
import {
  DEFAULT_OG_IMAGE,
  SITE_NAME,
  THEME_COLOR,
  TWITTER_HANDLE,
  getCanonicalUrl,
} from "../config/site";
import type { PageMeta } from "../types";

function upsertMeta(
  attribute: "name" | "property",
  key: string,
  content: string
): void {
  let element = document.querySelector<HTMLMetaElement>(
    `meta[${attribute}="${key}"]`
  );

  if (!element) {
    element = document.createElement("meta");
    element.setAttribute(attribute, key);
    document.head.appendChild(element);
  }

  element.setAttribute("content", content);
}

function upsertLink(rel: string, href: string): void {
  let element = document.querySelector<HTMLLinkElement>(`link[rel="${rel}"]`);

  if (!element) {
    element = document.createElement("link");
    element.setAttribute("rel", rel);
    document.head.appendChild(element);
  }

  element.setAttribute("href", href);
}

export function usePageMeta({
  title,
  description,
  path = "/",
  image = DEFAULT_OG_IMAGE,
}: PageMeta): void {
  useEffect(() => {
    const canonicalUrl = getCanonicalUrl(path);

    document.title = title;

    upsertMeta("name", "description", description);
    upsertMeta("name", "theme-color", THEME_COLOR);
    upsertMeta("name", "author", "Samir Jadhav");
    upsertLink("canonical", canonicalUrl);

    upsertMeta("property", "og:title", title);
    upsertMeta("property", "og:description", description);
    upsertMeta("property", "og:url", canonicalUrl);
    upsertMeta("property", "og:type", "website");
    upsertMeta("property", "og:image", image);
    upsertMeta("property", "og:site_name", SITE_NAME);

    upsertMeta("name", "twitter:card", "summary_large_image");
    upsertMeta("name", "twitter:title", title);
    upsertMeta("name", "twitter:description", description);
    upsertMeta("name", "twitter:image", image);
    upsertMeta("name", "twitter:creator", TWITTER_HANDLE);
  }, [title, description, path, image]);
}
