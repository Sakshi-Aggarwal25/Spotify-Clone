import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SonglistService {

  constructor(public httpClient: HttpClient ) { }
  getSongList(): Observable<any>{
    return this.httpClient.get('http://localhost:3001/search-lib');
  }
}
