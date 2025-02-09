import express, { Request, Response, Express } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
const app: Express = express(); // Explicitly set `app` type
app.use(express.json());

app.post("/auth/login", async (req: Request, res: Response): Promise<void> => {
    try {
        const { email, password } = req.body;

        // Find user in database
        const user = await prisma.user.findUnique({ where: { email } });

        if (!user) {
            res.status(401).json({ error: "User not found" });
            return;
        }

        // Check password (plaintext for now, should use bcrypt)
        if (user.password !== password) {
            res.status(401).json({ error: "Invalid password" });
            return;
        }

        // Generate a simple token (replace with JWT in production)
        const fakeToken = Buffer.from(`${email}:${Date.now()}`).toString("base64");

        res.json({ token: fakeToken, email: user.email });
    } catch (error) {
        console.error("Login error:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});

// Start Express server
app.listen(4000, () => console.log("Auth server running on http://127.0.0.1:4000"));

