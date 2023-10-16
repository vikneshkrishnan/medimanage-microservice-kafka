import { Patient } from "@prisma/client";

export interface Doctor {
  id: number;
  name: string;
  email: string;
  password: string;
  createdAt: Date;
  updatedAt: Date;

}
