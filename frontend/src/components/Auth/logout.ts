import { deleteToken, getServerAuth } from './ServerProtectedRoute';

export async function handleSignOut() {
  await deleteToken();
  const authToken = await getServerAuth();
  console.log('Token after deletion:', authToken); // Should be undefined
}
