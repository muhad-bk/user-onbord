import "reflect-metadata";
import { buildSchema } from "type-graphql";
import { ApolloServer } from "apollo-server";
import { PrismaClient } from "@prisma/client";

import { resolvers } from "./generated/type-graphql";

const prisma = new PrismaClient();

async function main() {
    const schema = await buildSchema({
        resolvers,
        emitSchemaFile: true,
        validate: false,
        // globalMiddlewares: [],
        // context: ({ req }) => ({
        //     prisma,
        // }),
    });

    
    await prisma.$connect();

    const server = new ApolloServer({
        schema,
        context: () => ({
            prisma,
        }),
    });

    const { url } = await server.listen(4000);
    console.log(`Server is running, GraphQL Playground available at ${url}`);
}

main().catch(()=>console.log()).finally(async () => {
    await prisma.$disconnect();
});