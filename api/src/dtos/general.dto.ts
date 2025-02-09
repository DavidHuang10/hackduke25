import { Days, DomainGroup, User } from "@prisma/client";

// export class CreateLimitDto {
//     userId: number;
//     name: string;
//     startTime: string;
//     endTime: string;
//     allowedDistractionTime: number;
//     recurringDays: Days[];
//     specificDomains: string[];
//     domainGroups: DomainGroup[]; // takes in domainGroup ids
// }

export class CreateLimitDto {
    userId: number;
    name: string;
    startTime: string;
    endTime: string;
    allowedDistractionTime: number;
    recurringDays: Days[];
    specificDomains: string[];
    domainGroupIds: number[];
}

// model Limits {
//     id              Int           @id @default(autoincrement())
//     user            User          @relation(fields: [userId], references: [id])
//     userId          Int
//     name String
//     startTime String
//     endTime String
//     allowedDistractionTime Float
//     recurringDays Days[]
//     specificDomains String[]
//     domainGroups    DomainGroup[]
//   }