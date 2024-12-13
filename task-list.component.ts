import { Component, OnInit } from '@angular/core';
import { TaskService } from '../task.service'; 
import { TaskDto } from '../task-dto';  
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../auth.service';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css'],
  imports :[CommonModule, FormsModule],
})
export class TaskListComponent implements OnInit {
  tasks: TaskDto[] = [];
  message: { text: string; type: string } | null = null;

  constructor(private taskService: TaskService) { }

  ngOnInit(): void {

   
    this.getTasks();
  }

  // get the tasks from the service
  getTasks(): void {
    this.taskService.getTasks().subscribe(
      (tasks: TaskDto[]) => {
        // Initialize tasks with the edit mode flag
        this.tasks = tasks.map(task => ({
          ...task, 
          isEditing: false, 
          title: task.title,
          status: task.state.trim,
          effort: task.effort
        }));
        this.message = { text: 'Tasks loaded successfully!', type: 'success' };
      },
      error => {
        this.message = { text: 'Failed to load tasks!', type: 'error' };
      }
    );
  }

  // Enable inline editing mode
  editTask(index: number): void {
      this.tasks[index].isEditing = true;
  }

  // Save the updated task
  saveTask(index: number): void {
    const updatedTask = this.tasks[index];
    this.taskService.updateTask(updatedTask).subscribe(
      () => {
        this.tasks[index].isEditing = false;
        this.message = { text: 'Task updated successfully!', type: 'success' };
      },
      () => {
        this.message = { text: 'Failed to update task!', type: 'error' };
      }
    );
  }

  // Cancel the inline editing
  cancelEdit(index: number): void {
    const originalTask = this.tasks[index];
  
    this.tasks[index] = { ...originalTask, isEditing: false };
  }

  // Delete a task
  deleteTask(id: number): void {
    this.taskService.deleteTask(id).subscribe(() => {
      this.tasks = this.tasks.filter(task => task.id !== id);
      this.message = { text: 'Task deleted successfully!', type: 'success' };
    });
  }
}