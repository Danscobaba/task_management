import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Task } from '../interfaces/task';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private apiUrl = environment.apiUrl;
  constructor(private http: HttpClient) { }

  fetchAllTasks(): Promise<Task[]> {
    return new Promise((resolve, reject) => {
      this.http.get<Task[]>(this.apiUrl + '/tasks').subscribe(res => {
        resolve(res);
      }, error => {
        console.log(error);
        reject(error);
      });
    });
  }

  fetchTaskById(id: string): Promise<Task> {
    return new Promise((resolve, reject) => {
      this.http.get<Task>(`${this.apiUrl}/tasks/${id}`).subscribe(res => {
        resolve(res);
      }, error => {
        console.log(error);
        reject(error);
      });
    });
  }

  createTask(task: Partial<Task>): Promise<Task> {
    return new Promise((resolve, reject) => {
      this.http.post<Task>(`${this.apiUrl}/tasks`, task).subscribe(res => {
        resolve(res);
      }, error => {
        console.log(error);
        reject(error);
      });
    });
  }

  updateTaskStatus(id: string, status: string): Promise<Task> {
    return new Promise((resolve, reject) => {
      this.http.patch<Task>(`${this.apiUrl}/tasks/${id}/status`, { status }).subscribe(res => {
        resolve(res);
      }, error => {
        console.log(error);
        reject(error);
      });
    });
  }

  deleteTask(id: string): Promise<void> {
    return new Promise((resolve, reject) => {
      this.http.delete<void>(`${this.apiUrl}/tasks/${id}`).subscribe(res => {
        resolve(res);
      }, error => {
        console.log(error);
        reject(error);
      });
    });
  }

  handleNestError(error: any): string {
  const res = error?.response;
  if (res?.message) {
    if (typeof res.message === 'string') {
      return res.message;
    }
    // ValidationPipe/class-validator error array
    if (Array.isArray(res.message)) {
      return res.message[0];
    }
  }

  // Fallback by status code
  switch (error?.status) {
    case 400: return 'Invalid input.';
    case 401: return 'Unauthorized access.';
    case 403: return 'Forbidden.';
    case 404: return 'Resource not found.';
    case 422: return 'Unprocessable entity.';
    case 500: return 'Internal server error.';
  }

  return 'Something went wrong.';
}
  

}
