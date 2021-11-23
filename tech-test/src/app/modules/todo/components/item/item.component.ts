import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ITask} from '@shared/schemas/task';
import {ToDoService} from '../../services/dataservices/to-do.service';
import {ActivatedRoute, Router} from '@angular/router';
import {LoaderService} from '@services/loader.service';
import {finalize} from 'rxjs/operators';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.scss']
})
export class ItemComponent implements OnInit {

  public task: ITask | null = null;
  public errorMessage: string;

  constructor(private fb: FormBuilder,
              private toDoService: ToDoService,
              private router: Router,
              private route: ActivatedRoute,
              private loaderService: LoaderService,
  ) {
  }

  public ngOnInit(): void {
    if (this.route.snapshot.params.id) {
      this.loadTask();
    }
  }

  public loadTask() {
    this.toDoService.getTask(+this.route.snapshot.params.id).pipe(finalize(() => {
      this.loaderService.triggerLoading.emit(false);
    })).subscribe((task: ITask) => {
      this.task = task;
    }, (error => {
      this.errorMessage = error.message;
    }));
  }
}
