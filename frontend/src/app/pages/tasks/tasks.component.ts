import { Component, OnInit } from '@angular/core';
import { Task, TaskStatus } from '../../interfaces/task';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { TaskService } from '../../services/task.service';
import Swal from 'sweetalert2';
import { CustomModalComponent } from "../../components/custom-modal/custom-modal.component";
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Component({
  selector: 'app-tasks',
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    CustomModalComponent
  ],
  templateUrl: './tasks.component.html',
  styleUrl: './tasks.component.css'
})
export class TasksComponent implements OnInit {
  allStatus = [
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
  error: string = '';
  formError: string = "";
  tasks: Task[] = [];
  filteredTasks: Task[] = [];
  statusFilter: string = 'All';
  showNewTaskModal: boolean = false;
  createTaskForm: FormGroup;
  constructor(
    private fb: FormBuilder,
    private taskService: TaskService,
    private sanitizer: DomSanitizer
  ) {
    this.createTaskForm = this.fb.group({
      title: ['', [Validators.required]],
      description: ['']
    });
  }

  ngOnInit(): void {
    this.getAllTask();
  }
  formatDate(dateString: string): string {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  }


  getStatusIcon(status: TaskStatus): SafeHtml {
    let html = '';
    switch (status) {
      case 'DONE':
        html = `<i class="bi bi-check2-circle text-2xl text-green-600"></i>`;
        break;
      case 'OPEN':
        html = `<i class="bi bi-circle text-2xl text-gray-600"></i>`;
        break;
      case 'IN_PROGRESS':
        html = `<i class="bi bi-hourglass-split text-2xl text-yellow-600"></i>`;
        break;
      default:
        html = `<i class="bi bi-circle text-2xl text-gray-600"></i>`;
    }
    return this.sanitizer.bypassSecurityTrustHtml(html);
  }

  getStatusColor = (status: TaskStatus) => {
    switch (status) {
      case 'DONE': return 'bg-green-100 text-green-800';
      case 'IN_PROGRESS': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  getExactStatus(status: string): string {
    switch (status) {
      case 'DONE': return 'Done';
      case 'IN_PROGRESS': return 'In Progress';
      default: return 'Open';
    }
  }
  getStatusBadgeColor(status: TaskStatus): string {
    switch (status) {
      case 'DONE': return 'bg-green-100 text-green-800';
      case 'IN_PROGRESS': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  }
  getCardBorderColor(status: TaskStatus): string {
    switch (status) {
      case 'DONE': return 'border-t-2 border-t-green-300 ';
      case 'IN_PROGRESS': return 'border-t-2 border-t-yellow-300 ';
      default: return 'border-t-2 border-t-gray-300 ';
    }
  }
  filterTask(): void {
    if (this.statusFilter === 'All') {
      this.filteredTasks = [...this.tasks];
    } else {
      this.filteredTasks = this.tasks.filter(task => task.status === this.statusFilter);
    }
  }

  async getAllTask() {
    this.isLoading = true;
    try {
      this.tasks = await this.taskService.fetchAllTasks();
      this.filterTask();
      this.isLoading = false;
    } catch (error) {

    }
  }

  openModal(): void {
    this.showNewTaskModal = true;
  }
  closeModal(): void {
    this.showNewTaskModal = false;
    this.createTaskForm.reset();
  }

  async onSubmit() {
    if (this.createTaskForm.invalid) {
      return;
    }
    this.loading = true;

    try {
      const taskData = this.createTaskForm.value;
      await this.taskService.createTask(taskData);
      this.getAllTask();
      Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Task created successfully',
        showConfirmButton: false,
        timer: 1500
      })
      this.createTaskForm.reset();
      this.showNewTaskModal = false;
      this.loading = false;
    } catch (error: any) {
      console.error('Error creating task:', error);
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: this.taskService.handleNestError(error),
        showConfirmButton: false,
        timer: 1500
      });
      this.loading = false;
      return;
    } finally {
      this.loading = false;
    }

  }
  onDeleteTask(taskId: string): void {
    Swal.fire({
      title: 'Are you sure?',
      text: 'You won\'t be able to revert this!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await this.taskService.deleteTask(taskId)
          this.getAllTask();
          Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Task deleted successfully',
            showConfirmButton: false,
            timer: 1500
          })
        } catch (error: any) {
          console.error('Error deleting task:', error);
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: this.taskService.handleNestError(error),
            showConfirmButton: false,
            timer: 1500
          })
          return;
        } finally {
          this.loading = false;
        }
      }
    })

  }

  onChangeStatus(taskId: string, status: string): void {
    Swal.fire({
      title: 'Are you sure?',
      text: 'You want to change the status of this task!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, change it!'
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await this.taskService.updateTaskStatus(taskId, status)
          this.getAllTask();
          Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Task updated successfully',
            showConfirmButton: false,
            timer: 1500
          })
        } catch (error: any) {
          console.error('Error updating task:', error);
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: this.taskService.handleNestError(error),
            showConfirmButton: false,
            timer: 1500
          });
        }
      }
    })
  }
}
