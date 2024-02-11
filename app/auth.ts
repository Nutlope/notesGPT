import { auth } from '@clerk/nextjs';

export async function getAuthToken() {
  const { userId, getToken } = auth();
  const token = await getToken({ template: 'convex' });
  console.log({ userId, token });
  return (await auth().getToken({ template: 'convex' })) ?? undefined;
}
