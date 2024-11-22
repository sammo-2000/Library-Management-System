import prisma from "../../prisma/prisma";

export const getUserById = async (userId: string) => {
    return prisma.user.findUnique({
        where: {
            userId
        }
    });
}