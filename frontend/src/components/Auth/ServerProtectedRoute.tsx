'use server'
 
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
 
// import jwt from 'jsonwebtoken';
// import { parseCookies } from 'nookies';
// import dotenv from "dotenv";
// dotenv.config();
// import { env } from "../../types/envType";

// const secret_token = env.JWT_SECRET;

// export const serversideProtectedRoute = async (ctx: any) => {
//   const cookies = parseCookies(ctx);
//   const token = cookies.authToken;

//   if (!token) {
//     return {
//       redirect: {
//         destination: '/login',
//         permanent: false,
//       },
//     };
//   }

//   try {
//     jwt.verify(token, secret_token); // Verify token
//   } catch (err) {
//     return {
//       redirect: {
//         destination: '/login',
//         permanent: false, 
//       },
//     };
//   }
//   return {
//     props: {}, 
//   };
// };
export const getServerAuth = async () => {
  const cookieStore = await cookies()
  return cookieStore.get('authToken')
}

export const deleteToken = async () => {
  const cookieStore = await cookies();
  cookieStore.set('authToken', '', {
    maxAge: -1, // Expire immediately
    path: '/',  // Ensure it's the same path as where the cookie was set
  });
  redirect('/')
};


