import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ToDoService} from '../../services/dataservices/to-do.service';
import {ActivatedRoute, Router} from '@angular/router';
import {ITaskDto} from '@shared/schemas/dtos/task.dto.';
import {ITask} from '@shared/schemas/task';
import {finalize} from 'rxjs/operators';
import {LoaderService} from '@services/loader.service';

@Component({
  selector: 'app-create-item',
  templateUrl: './create-item.component.html',
  styleUrls: ['./create-item.component.scss']
})
export class CreateItemComponent implements OnInit {

  public createTaskForm: FormGroup;
  private task: ITask | null = null;
  private errorMessage: string;

  constructor(private fb: FormBuilder,
              private toDoService: ToDoService,
              private router: Router,
              private route: ActivatedRoute,
              private loaderService: LoaderService,
  ) {
  }

  public ngOnInit(): void {
    this.createForm();
    if (this.route.snapshot.params.id) {
      this.loadEditingTask();
    }

  }

  public createTask(): void {
    if (!this.createTaskForm.invalid) {
      const taskDataDTO = this.getDTOFromFrom();
      this.toDoService.createTask(taskDataDTO).pipe(finalize(() => {
        this.loaderService.triggerLoading.emit(false);
      })).subscribe(() => {
        this.router.navigate(['../']);
      }, (error) => {
        this.errorMessage = error.message;
      });
    }
  }

  private getDTOFromFrom(): ITaskDto {
    const formData = this.createTaskForm.getRawValue();
    return {
      ...formData,
      done: false,
    };
  }

  private createForm(): void {
    this.createTaskForm = this.fb.group({
      category: ['', Validators.required],
      description: ['', Validators.required],
      label: ['', Validators.required],
    });

  }

  private loadEditingTask() {
    this.toDoService.getTask(+this.route.snapshot.params.id).pipe(finalize(() => {
      this.loaderService.triggerLoading.emit(false);
    })).subscribe((task: ITask) => {
      this.task = task;
      this.populateTAskForm();
    }, (error => {
      this.errorMessage = error.message;
    }));
  }

  private populateTAskForm(): void {
    this.createTaskForm.patchValue({
      category: this.task.category,
      description: this.task.description,
      label: this.task.label,
    });
  }

  public onFormSubmit() {
    if (this.task) {
      this.updateTask();
    } else {
      this.createTask();
    }
  }

  public updateTask(): void {
    if (!this.createTaskForm.invalid) {
      const data = {
        ...this.task,
        ...this.createTaskForm.getRawValue(),
      };
      this.toDoService.updateTask(data).pipe(finalize(() => {
        this.loaderService.triggerLoading.emit(false);
      })).subscribe(() => {
        this.router.navigate(['../']);
      }, (error) => {
        this.errorMessage = error.message;
      });
    }
  }
}
