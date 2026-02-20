import React from "react";

const noop = () => {};

export function Link({
  href,
  children,
  ...rest
}: { href: string; children: React.ReactNode }) {
  return (
    <a href={href} {...rest}>
      {children}
    </a>
  );
}

export const useRouter = () => ({
  push: noop,
  replace: noop,
  prefetch: noop,
  back: noop,
  forward: noop,
  refresh: noop,
});

export const usePathname = () => "/";

export const redirect = noop;
export const getPathname = noop;
