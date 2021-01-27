import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ChartService {

  constructor( public httpClient: HttpClient ) { }

  getCharts(): Observable<any>{
    // var a = this.httpClient.get('http://localhost:3001/charts'); 
    // console.log(a);
    return this.httpClient.get('http://localhost:3001/charts');
  }
}
