import { PartialType } from '@nestjs/mapped-types';
import { CreateTaskDto, TaskStatus } from './create-task.dto';
import { IsEnum } from 'class-validator';

export class UpdateTaskDto extends PartialType(CreateTaskDto) {
  @IsEnum(TaskStatus)
  status: TaskStatus;
}
