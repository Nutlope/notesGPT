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

export const envVarsMissing = query({
  args: {},
  handler: async () => {
    if (process.env.REPLICATE_API_KEY && process.env.TOGETHER_API_KEY) {
      return null;
    }
    const deploymentName = process.env.CONVEX_CLOUD_URL?.slice(8).replace(
      '.convex.cloud',
      '',
    );
    return (
      'https://dashboard.convex.dev/d/' +
      deploymentName +
      `/settings/environment-variables?var=REPLICATE_API_KEY&var=TOGETHER_API_KEY`
    );
  },
});
