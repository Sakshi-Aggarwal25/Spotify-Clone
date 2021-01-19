import { Injectable } from '@angular/core';
import { Playlist } from './shared/playlist.model';

@Injectable({
  providedIn: 'root'
})
export class PlaylistDataService {
  playlists: Playlist[] = [
    new Playlist('Favourite'),
    new Playlist('Bathroom Diaries'),
    new Playlist('Low Music'),
    new Playlist('Soothing Vibes')
  ]
  
  constructor() { }

  get(){
    return this.playlists;
  }
  
  add(playlist: Playlist){
    this.playlists.push(playlist);
  }

}
