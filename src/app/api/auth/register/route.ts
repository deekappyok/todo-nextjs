// app/api/auth/register/route.ts
import { NextResponse } from 'next/server';
import { prisma } from '../../../../lib/prisma'; // Adjust the path as necessary
import bycrypt from 'bcryptjs';

export async function POST(req: Request) {
  const { email, password, confirmPassword, username } = await req.json();

  // Check if passwords match
  if (password !== confirmPassword) {
    return NextResponse.json({ error: 'Passwords do not match' }, { status: 400 });
  }

  // Hash the password
  const hashedPassword = await bycrypt.hashSync(password, 10);

  try {
    const user = await prisma.user.create({
      data: {
        name: username,
        email,
        password: hashedPassword,
      },
    });
    return NextResponse.json(user, { status: 201 });
  } catch (error) {
    console.log(error)
    return NextResponse.json({ error: 'User already exists' }, { status: 500 });
  }
}
