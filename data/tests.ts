import prisma from "@/lib/db";

export const getAllTest = async () => {
  try {
    const test = prisma.test.findMany();
    return test;
  } catch {
    return null;
  }
};

export const getTestByTitle = async (title: string) => {
  try {
    const test = prisma.test.findUnique({
      where: { title },
    });
    return test;
  } catch {
    return null;
  }
};

export const getTestById = async (id: string) => {
  try {
    const test = prisma.test.findUnique({
      where: { id },
    });
    return test;
  } catch {
    return null;
  }
};

export const deleteTestById = async (id: string) => {
  try {
    const deletedTest = await prisma.test.delete({
      where: { id },
    });
    return deletedTest;
  } catch {
    return null;
  }
};
