import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma.service';

@Injectable()
export class ExtensionService {
  constructor(private prisma: PrismaService) {}

  async record(data: { user: string; domain: string | null; time: number }) {
    console.log("Incoming Data:", data);

    if (!data.user) {
        throw new Error("User ID is required for tracking activity");
    }

    const userId = parseInt(data.user);
    if (isNaN(userId)) {
        throw new Error("Invalid user ID");
    }

    try {
        const action = await this.prisma.action.create({
            data: {
                userId: userId,  // Correct reference to `id`
                domain: data.domain,
                time: new Date(data.time),
            },
        });

        console.log("Saved action:", action);
        return { message: "Action recorded", data: action };
    } catch (error) {
        console.error("Prisma Error:", error);
        throw new Error("Database error");
    }
}

}

