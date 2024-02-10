import { ConvexError } from 'convex/values';
import { action, mutation, query } from './_generated/server';
import {
  customAction,
  customCtx,
  customMutation,
  customQuery,
} from 'convex-helpers/server/customFunctions';

export const queryWithUser = customQuery(
  query,
  customCtx(async (ctx) => {
    const authInfo = await ctx.auth.getUserIdentity();
    if (!authInfo) {
      throw new ConvexError('NOT_LOGGED_IN');
    }
    const newCtx = {
      userId: authInfo.tokenIdentifier,
    };
    return Object.assign(newCtx, ctx);
  }),
);

export const mutationWithUser = customMutation(
  mutation,
  customCtx(async (ctx) => {
    const authInfo = await ctx.auth.getUserIdentity();
    if (!authInfo) {
      throw new ConvexError('User must be logged in.');
    }
    const newCtx = {
      userId: authInfo.tokenIdentifier,
    };
    return Object.assign(newCtx, ctx);
  }),
);

export const actionWithUser = customAction(
  action,
  customCtx(async (ctx) => {
    const authInfo = await ctx.auth.getUserIdentity();
    if (!authInfo) {
      throw new ConvexError('User must be logged in.');
    }
    const newCtx = {
      userId: authInfo.tokenIdentifier,
    };
    return Object.assign(newCtx, ctx);
  }),
);
