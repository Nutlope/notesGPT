import { auth } from '@clerk/nextjs';

export async function getAuthToken() {
  return (await auth().getToken({ template: 'convex' })) ?? undefined;
}
