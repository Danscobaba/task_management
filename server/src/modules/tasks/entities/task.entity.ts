import { TaskStatus } from '../dto/create-task.dto';
import { v4 as uuidv4 } from 'uuid';
export class Task {
  id: string;
  title: string;
  description?: string;
  status: TaskStatus;
  createdAt: Date;
  updatedAt: Date | null;

  constructor(title: string, description?: string) {
    this.id = uuidv4(); // Assuming you have a UUID generation function
    this.title = title;
    this.description = description;
    this.status = TaskStatus.OPEN;
    this.createdAt = new Date();
    this.updatedAt = null;
  }
}
