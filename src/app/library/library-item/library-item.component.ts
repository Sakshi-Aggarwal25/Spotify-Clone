import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild, ElementRef, Output, EventEmitter } from '@angular/core';
import { PlaylistService } from 'src/app/playlist.service';
import { Playlist } from '../../shared/playlist.model';
@Component({
  selector: 'app-library-item',
  templateUrl: './library-item.component.html',
  styleUrls: ['./library-item.component.css']
})
export class LibraryItemComponent implements OnInit {
  @ViewChild('nameInput', {static: false}) nameInputRef: ElementRef;
  @Output() playlistAdded = new EventEmitter<Playlist>();
  constructor(public playlistService : PlaylistService, public httpClient: HttpClient) { }

  ngOnInit(): void {
  }
  playlists: any[];
  onAddItem(){
      const plName = this.nameInputRef.nativeElement.value;
      // const newPlaylist = new Playlist(plName );
      
      this.nameInputRef.nativeElement.value = "";

      // this.playlistAdded.emit(newPlaylist);
      const d = {
        "name": plName,
         "song": [
            
        ],
        "userID": "1002"
    };
      this.playlistService.addToPlaylist(d).subscribe(
        response => {
          console.log("hey", response);
          this.playlists = response;
        }, error => {
          console.log(error);
        }
      );
    
      // this.httpClient.post('http://localhost:3001/playlist' , d);
  }
}

