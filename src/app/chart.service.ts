import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ChartService {

  constructor( public httpClient: HttpClient ) { }

  getCharts(): Observable<any>{
    return this.httpClient.get('http://localhost:3001/charts');
  }
}
