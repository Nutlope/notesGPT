import { auth } from '@clerk/nextjs';

export async function getAuthToken() {
  console.log('auth token is', await auth().getToken({ template: 'convex' }));
  return (await auth().getToken({ template: 'convex' })) ?? undefined;
}
