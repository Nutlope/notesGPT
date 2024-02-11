import { usePreloadedQuery } from 'convex/react';
import { ConvexError } from 'convex/values';
import { useRef } from 'react';

export const useAuthenticatedPreloadedQuery = ((preloaded) => {
  let result;
  const stored = useRef(result); // ref objects are stable between rerenders
  try {
    stored.current = usePreloadedQuery(preloaded);
  } catch (error) {
    if (error instanceof ConvexError && error.data === 'NOT_LOGGED_IN') {
    } else {
      throw error;
    }
  }
  // undefined on first load, stale data while loading, fresh data after loading
  return stored.current;
}) as typeof usePreloadedQuery;
