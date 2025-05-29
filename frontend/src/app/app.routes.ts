import { Routes } from '@angular/router';
import { TasksComponent } from './pages/tasks/tasks.component';

export const routes: Routes = [
  {
    path: '',
    component: TasksComponent,
    pathMatch: 'full'
  },
  {
    path: 'tasks',
    component: TasksComponent
  }
];
