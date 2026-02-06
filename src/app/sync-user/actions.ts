'use server';

import { auth, clerkClient } from '@clerk/nextjs/server';
import { db } from '@/server/db';
import { redirect } from 'next/navigation';

export async function syncUserAction() {
  const { userId } = await auth();

  if (!userId) {
    throw new Error('User not authenticated');
  }

  const client = await clerkClient();
  const user = await client.users.getUser(userId);

  const email = user.emailAddresses[0]?.emailAddress;
  if (!email) {
    throw new Error('Email not found');
  }

  await db.user.upsert({
    where: { emailaddress: email },
    update: {
      imageUrl: user.imageUrl,
      firstName: user.firstName,
      lastName: user.lastName,
    },
    create: {
      id: userId,
      emailaddress: email,
      imageUrl: user.imageUrl,
      firstName: user.firstName,
      lastName: user.lastName,
    },
  });

  redirect('/dashboard');
}