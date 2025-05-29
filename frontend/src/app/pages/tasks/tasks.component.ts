import { Component } from '@angular/core';
import { Task, TaskStatus } from '../../interfaces/task';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TaskService } from '../../services/task.service';

@Component({
  selector: 'app-tasks',
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ],
  templateUrl: './tasks.component.html',
  styleUrl: './tasks.component.css'
})
export class TasksComponent {
  allStatus = [
    {
      label: 'All',
      value: 'All'
    },
    {
      label: 'Open',
      value: 'OPEN'
    },
    {
      label: 'In Progress',
      value: 'IN_PROGRESS'
    },
    {
      label: 'Done',
      value: "DONE"
    }
  ]

  isLoading: boolean = false;
  loading: boolean = false;
  tasks: Task[] = [];
  filteredTasks: Task[] = [];
  statusFilter: string = 'All';

  constructor(
    private taskService: TaskService,
  ) { }


  filterTask(): void {
    if (this.statusFilter === 'All') {
      this.filteredTasks = [...this.tasks];
    } else {
      this.filteredTasks = this.tasks.filter(task => task.status === this.statusFilter);
    }
  }
}
