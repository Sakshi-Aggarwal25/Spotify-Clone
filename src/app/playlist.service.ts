import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PlaylistService {

  constructor(public httpClient: HttpClient) { }
  playlists ;
  getPlaylist(){
    this.httpClient.get('http://localhost:3001/playlist').subscribe(
      response => {
        console.log("from service", response);
        this.playlists = response;
      }, error => {
        console.log(error);
      }
    );
    // return this.httpClient.get('http://localhost:3001/playlist');
  }

  addToPlaylist(pl: { name: string; song: { name: string; id: string; }[]; userID: string; }){
    this.httpClient.post('http://localhost:3001/playlist' , pl).subscribe(
      (response) => {
        console.log('hey', response);
        this.playlists.push(response); 
      },
      (error) => {
        console.log(error);
      }
    );
    // return this.httpClient.post('http://localhost:3001/playlist' , pl);
  }

  getSongsOfPlaylist(id): Observable<any>{
    return this.httpClient.get('http://localhost:3001/playlist/' + id);
  }

  updatePlaylist(name, list): Observable<any>{
    return this.httpClient.put('http://localhost:3001/playlist/' + name , list);
  }
}
