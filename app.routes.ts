import { Routes, RouterModule } from '@angular/router';
import { TaskListComponent } from './task-list/task-list.component';
import { TaskFormComponent } from './task-form/task-form.component';
import { LoginComponent } from './login/login.component';

export const routes: Routes = [
  { path: '', redirectTo: '/tasks', pathMatch: 'full' },
 // { path: 'login', component: LoginComponent },
  { path: 'tasks', component: TaskListComponent },
  { path: 'tasks/new', component: TaskFormComponent },
  { path: 'tasks/edit/:id', component: TaskFormComponent },
];
