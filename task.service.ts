import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TaskDto } from './task-dto';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  private apiUrl = 'https://localhost:7249/api/tasks';  // .NET Core API URL

  constructor(private http: HttpClient) {}

  getTasks(): Observable<TaskDto[]> {
    return this.http.get<TaskDto[]>(this.apiUrl);
  }

  getTaskById(id: number): Observable<TaskDto> {
    return this.http.get<TaskDto>(`${this.apiUrl}/${id}`);
  }

  createTask(task: TaskDto): Observable<TaskDto> {
    return this.http.post<TaskDto>(this.apiUrl, task);
  }

  updateTask(task: TaskDto): Observable<TaskDto> {
    return this.http.put<TaskDto>(`${this.apiUrl}/${task.id}`, task);
  }

  deleteTask(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}