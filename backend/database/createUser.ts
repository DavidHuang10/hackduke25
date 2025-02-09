import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function createUser(email: string, password: string) {
  try {
    // Create user in database (plain-text password)
    const user = await prisma.user.create({
      data: {
        email,
        password, // Stored as plain text (not recommended for production)
      },
    });

    console.log("User created:", user);
  } catch (error) {
    console.error("Error creating user:", error);
  } finally {
    await prisma.$disconnect();
  }
}

// Example usage: Creating a test user
// const TEST_USER_EMAIL = "test@example.com";
// const TEST_USER_PASSWORD = "1234";

// createUser(TEST_USER_EMAIL, TEST_USER_PASSWORD);
