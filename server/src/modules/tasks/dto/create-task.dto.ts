import { IsOptional, IsString } from "class-validator";

export enum TaskStatus {
  OPEN = "OPEN",
  IN_PROGRESS = "IN_PROGRESS",
  DONE = "DONE",
}
export class CreateTaskDto {
  @IsString()
  title: string;
  @IsString()
  @IsOptional()
  description?: string;
}
