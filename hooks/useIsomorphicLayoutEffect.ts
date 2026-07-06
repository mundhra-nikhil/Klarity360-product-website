import { useEffect, useLayoutEffect } from 'react';

/**
 * useIsomorphicLayoutEffect
 * 
 * Resolves to useLayoutEffect on the client and useEffect on the server.
 * This prevents the standard React SSR warning: "useLayoutEffect does nothing on the server".
 */
export const useIsomorphicLayoutEffect =
  typeof window !== 'undefined' ? useLayoutEffect : useEffect;
