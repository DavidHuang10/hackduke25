import { Injectable } from "@nestjs/common";
import { PrismaService } from "../../prisma.service";

@Injectable()
export class AuthService {
    constructor(private prisma: PrismaService) {}

    async login(email: string, password: string) {
        const user = await this.prisma.user.findUnique({ where: { email } });
    
        if (!user || user.password !== password) {
            return { error: "Invalid email or password" };
        }
    
        const token = Buffer.from(`${email}:${Date.now()}`).toString("base64");
    
        return { token, userId: user.id, email };
    }
    
}
