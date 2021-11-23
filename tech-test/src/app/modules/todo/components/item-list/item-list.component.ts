import {AfterViewInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {HttpErrorResponse} from '@angular/common/http';
import {debounceTime, distinctUntilChanged, finalize, tap} from 'rxjs/operators';
import {fromEvent} from 'rxjs';
import {MatTableDataSource} from '@angular/material/table';

import {ToDoService} from '../../services/dataservices/to-do.service';
import {ITask} from '@shared/schemas/task';
import {LoaderService} from '@services/loader.service';
import {Router} from '@angular/router';


@Component({
  selector: 'app-item-list',
  templateUrl: './item-list.component.html',
  styleUrls: ['./item-list.component.scss']
})
export class ItemListComponent implements OnInit, AfterViewInit {

  public tasks: MatTableDataSource<ITask>;
  public errorMessage: string;
  public displayedColumns = ['id', 'label', 'description', 'category', 'done', 'actions'];
  @ViewChild('tasksSearchField', {static: false}) searchFieldElement: ElementRef;


  constructor(private toDoService: ToDoService,
              private loaderService: LoaderService,
              private router: Router) {
  }

  public ngOnInit(): void {
    this.loadData();

  }

  public ngAfterViewInit(): void {
    this.listenFilterFieldChanges();
  }

  public onTaskDone(task: ITask): void {
    this.loaderService.triggerLoading.emit(true);
    this.toDoService.markAsDone(task).pipe(finalize(() => {
      this.loaderService.triggerLoading.emit(false);
    })).subscribe(() => {
      this.loadData();
    }, (error: HttpErrorResponse) => {
      this.errorMessage = error.message;
    });
  }

  private loadData(): void {
    this.loaderService.triggerLoading.emit(true);
    this.toDoService.getList().pipe(finalize(() => {
      this.loaderService.triggerLoading.emit(false);
    })).subscribe((tasks: ITask[]) => {
      this.tasks = new MatTableDataSource(tasks);
    }, (error: HttpErrorResponse) => {
      this.errorMessage = error.message;
    });

  }

  private listenFilterFieldChanges() {
    fromEvent(this.searchFieldElement.nativeElement, 'keyup')
      .pipe(
        debounceTime(500),
        distinctUntilChanged(),
        tap((text) => {
          console.log(text);
        })
      )
      .subscribe((event: KeyboardEvent) => {
        this.tasks.filter = (event.target as HTMLInputElement).value;
      });
  }

  public onEditTask(id: number): void {
    this.router.navigate(['todo/update', id]);
  }

  public onViewTask(id: number): void {
    this.router.navigate(['todo', id]);
  }


}
