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
}
