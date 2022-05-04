import "reflect-metadata";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
    await prisma.$connect();

    await prisma.user.create({
        data: {
            email: "test1@gmail.com",
        }
    });
    console.log("done first");
    await prisma.user.create({
        data: {
            email: "test2@gmail.com",
        }
    });
}

main().catch(console.log).finally(async () => {
    await prisma.$disconnect();
});