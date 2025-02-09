import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function verifyUser(email: string, password: string) {
  try {
    // Print all users for debugging
    const users = await prisma.user.findMany();
    console.log("Checking email:", email);

    // Find user by email
    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      console.log("User not found.");
      return;
    }

    if (user.password === password) {
      console.log("Login successful:", user);
    } else {
      console.log("Incorrect password.");
    }
  } catch (error) {
    console.error("Error verifying user:", error);
  } finally {
    await prisma.$disconnect();
  }
}

// Example test
// const TEST_USER_EMAIL = "test@example.com";
// const TEST_USER_PASSWORD = "1234";

// verifyUser(TEST_USER_EMAIL, TEST_USER_PASSWORD);
