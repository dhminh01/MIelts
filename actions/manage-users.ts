'use server';

import prisma from '@/lib/db'; // Adjust import path as needed
import bcrypt from 'bcrypt';

export const addUser = async (data: { name: string; email: string; password: string; role: 'USER' | 'ADMIN' | 'INSTRUCTOR' }) => {
  const hashedPassword = await bcrypt.hash(data.password, 10);
  return await prisma.user.create({
    data: {
      name: data.name,
      email: data.email,
      password: hashedPassword,
      role: data.role,
    },
  });
};

export const updateUser = async (id: string, updates: { name?: string; email?: string; password?: string; role?: 'USER' | 'ADMIN' | 'INSTRUCTOR' }) => {
  const data: { name?: string; email?: string; password?: string; role?: string } = { ...updates };
  if (updates.password) {
    data.password = await bcrypt.hash(updates.password, 10);
  }
  return await prisma.user.update({
    where: { id },
    data,
  });
};

export const deleteUser = async (id: string) => {
  return await prisma.user.delete({
    where: { id },
  });
};

export const fetchUsers = async () => {
  return await prisma.user.findMany({
    select: { id: true, name: true, email: true, role: true, createdAt: true },
  });
};
