import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PlaylistService {

  constructor(public httpClient: HttpClient) { }
  getPlaylist(): Observable<any>{
    return this.httpClient.get('http://localhost:3001/playlist');
  }

  addToPlaylist(pl: { name: string; song: { name: string; id: string; }[]; userID: string; }): Observable<any>{
    return this.httpClient.post('http://localhost:3001/playlist' , pl);
  }
}
