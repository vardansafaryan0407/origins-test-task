import {Injectable} from '@angular/core';
import {BaseService} from '../../../../services/dataservices/base.service';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {ConfigService} from '@services/config.service';
import {ITask} from '@shared/schemas/task';
import {GeneralHelper} from '@services/helpers/general.helper';
import {ITaskDto} from '@shared/schemas/dtos/task.dto.';

@Injectable()
export class ToDoService extends BaseService {

  constructor(http: HttpClient, private configService: ConfigService) {
    super(http);
  }

  public getList(): Observable<ITask[]> {
    return this.get(`${this.configService.apiUrl}/tasks`);
  }

  public markAsDone(item: ITask): Observable<ITask> {
    const data = {
      ...item,
      done: GeneralHelper.getCurrentDate()
    };
    return this.update(`${this.configService.apiUrl}/tasks/${item.id}`, data);
  }

  public updateTask(item: ITask): Observable<ITask> {
    return this.update(`${this.configService.apiUrl}/tasks/${item.id}`, item);
  }

  public createTask(data: ITaskDto): Observable<ITask> {
    return this.create(`${this.configService.apiUrl}/tasks/`, data);
  }

  public getTask(id: number): Observable<ITask> {
    return this.get(`${this.configService.apiUrl}/tasks/${id}`);
  }
}
