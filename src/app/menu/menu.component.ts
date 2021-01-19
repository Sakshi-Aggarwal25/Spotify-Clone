import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';
import { Playlist } from '../shared/playlist.model';
import { Router } from '@angular/router'
import { PlaylistDataService } from '../playlist-data.service';
@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {
  @Output() featureSelected = new EventEmitter<string>();
  // @Input() playlists: Playlist[] = [
  //   new Playlist('Favourite'),
  //   new Playlist('Bathroom Diaries'),
  //   new Playlist('Low Music'),
  //   new Playlist('Soothing Vibes')
  // ];
  playlists: Playlist[]= this.playlistData.playlists;
  constructor(private router: Router , private playlistData: PlaylistDataService) { }

  ngOnInit(): void {
  }
  onSelect(feature: string){
    this.featureSelected.emit(feature);
  }
  choosePlaylist(playlist){
    this.router.navigate(['/library', playlist.name]);
  }
}
