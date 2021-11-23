import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BaseService {

  constructor(private http: HttpClient) {

  }

  public get(url: string, options?: any): Observable<any> {
    return this.http.get(url, options);
  }

  public create(url: string, payload: any, options?: any): Observable<any> {
    return this.http.post(url, payload, options);
  }

  public update(url: string, payload: any, options?: any): Observable<any> {
    return this.http.patch(url, payload, options);
  }

  public delete(url: string, options?: any): Observable<any> {
    return this.http.delete(url, options);
  }

}
