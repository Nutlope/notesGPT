import { ConvexError } from 'convex/values';
import { action, mutation, query } from './_generated/server';
import {
  customAction,
  customCtx,
  customMutation,
  customQuery,
} from 'convex-helpers/server/customFunctions';
import { Auth } from 'convex/server';

async function getUserId(ctx: { auth: Auth }): Promise<string> {
  const authInfo = await ctx.auth.getUserIdentity();
  if (!authInfo) {
    throw new ConvexError('User must be logged in.');
  }
  return authInfo.tokenIdentifier;
}

export const queryWithUser = customQuery(
  query,
  customCtx(async (ctx) => {
    return {
      userId: await getUserId(ctx),
    };
  }),
);

export const mutationWithUser = customMutation(
  mutation,
  customCtx(async (ctx) => {
    return {
      userId: await getUserId(ctx),
    };
  }),
);

export const actionWithUser = customAction(
  action,
  customCtx(async (ctx) => {
    return {
      userId: await getUserId(ctx),
    };
  }),
);
