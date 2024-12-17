import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const user = await prisma.user.createMany({
    data: [
      {
        id: 1,
        username: "admin",
        password: process.env.ADMIN_PASSWORD || "SECRET",
        role: "Admin",
      },
    ],
  });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
  });