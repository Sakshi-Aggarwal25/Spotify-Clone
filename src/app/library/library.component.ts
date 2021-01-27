import { Component, OnInit } from '@angular/core';
import { Playlist } from '../shared/playlist.model';
declare var $:any;

import { Router } from '@angular/router'
import { Output } from '@angular/core';
import { PlaylistDataService } from '../playlist-data.service';
import { PlaylistService } from '../playlist.service';
// import 'jqueryui';
@Component({
  selector: 'app-library',
  templateUrl: './library.component.html',
  styleUrls: ['./library.component.css']
})
export class LibraryComponent implements OnInit {
  // @Output() playlists: Playlist[] = [
  //   new Playlist('Favourite'),
  //   new Playlist('Bathroom Diaries'),
  //   new Playlist('Low Music'),
  //   new Playlist('Soothing Vibes')
  // ]
  // router: any;
  // playlists: Playlist[] = this.playlistData.playlists;
  constructor(private router: Router, private playlistData: PlaylistDataService, public playlistService : PlaylistService) { }
  playlists: any[];
  ngOnInit(): void {
    // $(".myClass").draggable({
    //   axis: "y"
    // });
    this.playlistService.getPlaylist().subscribe(
      response => {
        console.log("hey", response);
        this.playlists = response;
      }, error => {

      }
    );
  }


  onPlaylistAdded(playlist: Playlist){
    // this.playlists.push(playlist);
    this.playlistData.add(playlist);
  }

  choosePlaylist(playlist){
    this.router.navigate(['/library', playlist.name]);
  }
}


