import { Component, OnInit, Input } from '@angular/core';
import { TaskService } from '../task.service';
import { TaskDto } from '../task-dto';
import { ActivatedRoute, Router } from '@angular/router';
import { FormsModule } from '@angular/forms'; 

@Component({
  selector: 'app-task-form',
  standalone: true,
  templateUrl: './task-form.component.html',
  styleUrls: ['./task-form.component.css'],
  imports: [FormsModule],
})
export class TaskFormComponent implements OnInit {
  @Input() task: TaskDto = new TaskDto();

  constructor(
    private taskService: TaskService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    const taskId = this.route.snapshot.paramMap.get('id');
    if (taskId) {
      this.taskService.getTaskById(+taskId).subscribe((task: TaskDto) => {
        this.task = task;
      });
    }
  }

  onSubmit(): void {
    if (this.task.id) {
      this.taskService.updateTask(this.task).subscribe(() => {
        this.router.navigate(['/tasks']);
      });
    } else {
      this.taskService.createTask(this.task).subscribe(() => {
        this.router.navigate(['/tasks']);
      });
    }
  }
}