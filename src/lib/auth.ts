// lib/auth.ts
import { getSession } from 'next-auth/react';
import { NextApiRequest, NextApiResponse } from 'next';

export const requireAuth = async (req: NextApiRequest, res: NextApiResponse) => {
  const session = await getSession({ req });

  if (!session) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  return session;
};


// pages/api/auth/[...nextauth].ts
import CredentialsProvider from 'next-auth/providers/credentials';
import { PrismaAdapter } from '@next-auth/prisma-adapter';
import {prisma} from './prisma'; // Ensure this path is correct
import bcrypt from 'bcryptjs';
import { NextAuthOptions } from 'next-auth';
export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: "Email", type: "text", placeholder: "you@example.com" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        // Check if credentials are provided
        if (!credentials?.email || !credentials?.password) {
          throw new Error('Email and password are required');
        }

        const user = await prisma.user.findUnique({
          where: { email: credentials.email },
        });

        // Check if user exists and password matches
        if (user && bcrypt.compareSync(credentials.password, user.password)) {
          return user; // Return user object if authentication is successful
        } else {
          throw new Error('Invalid email or password');
        }
      }
    }),
  ],
  pages: {
    signIn: '/auth/login', // Custom sign-in page
  },
  session: {
    strategy: 'jwt',
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id; // Assuming user has an id field
      }
      return token;
    },
    async session({ token, session }) {
      if (token && session.user) {
        session.user.id = token.id as string;
      }

      return session; // so user will be able to retrieve id and username from session
    },
  },
};

export default authOptions
