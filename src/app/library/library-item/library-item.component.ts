import { Component, OnInit, ViewChild, ElementRef, Output, EventEmitter } from '@angular/core';
import { Playlist } from '../../shared/playlist.model';
@Component({
  selector: 'app-library-item',
  templateUrl: './library-item.component.html',
  styleUrls: ['./library-item.component.css']
})
export class LibraryItemComponent implements OnInit {
  @ViewChild('nameInput', {static: false}) nameInputRef: ElementRef;
  @Output() playlistAdded = new EventEmitter<Playlist>();
  constructor() { }

  ngOnInit(): void {
  }

  onAddItem(){
      const plName = this.nameInputRef.nativeElement.value;
      const newPlaylist = new Playlist(plName );
      
      this.nameInputRef.nativeElement.value = "";

      this.playlistAdded.emit(newPlaylist);
  }
}

