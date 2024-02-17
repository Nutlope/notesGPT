import { preloadedQueryResult } from 'convex/nextjs';
import { Preloaded, usePreloadedQuery } from 'convex/react';
import { FunctionReference } from 'convex/server';

// Returns the result from server while the client
// is being authenticated.
// This assumes:
//  1. The query only returns `null` when it's waiting for auth
//  2. The query is always authenticated when called from the server
export function usePreloadedQueryWithAuth<
  Query extends FunctionReference<'query'>,
>(preloadedQuery: Preloaded<Query>): Exclude<Query['_returnType'], null> {
  const loaded = usePreloadedQuery(preloadedQuery);
  return loaded ?? preloadedQueryResult(preloadedQuery);
}
