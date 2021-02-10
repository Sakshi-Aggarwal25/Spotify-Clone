import { Component, OnInit } from '@angular/core';
import { SonglistService } from '../songlist.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
declare var $:any;

@Component({
  selector: 'app-search-lib',
  templateUrl: './search-lib.component.html',
  styleUrls: ['./search-lib.component.css']
})
export class SearchLibComponent implements OnInit {
  closeResult = '';
  constructor(public songlistService: SonglistService, private modalService: NgbModal) { }
  songs = [];
  filteredSongs = [];
  filteredArtists = [];
  ngOnInit(): void {
    this.songlistService.getSongList().subscribe(
      response => {
        console.log("Song List", response);
        this.songs = response;
        for(let i = 0 ; i < this.songs.length ; i++){
          this.filteredSongs.push(this.songs[i]);
          this.filteredArtists.push(this.songs[i]);

        }
      }, error => {
        console.log(error);
      }
    );
  }
  
  currValue;
  open(content, song) {
    console.log(song);
    this.currValue = song;
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title', centered: true, size: 'lg' }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    });
  }
  
  searchSong(){
    console.log($("#findMe").val());
    this.songlistService.getFilteredList($("#findMe").val()).subscribe(
      response => {
        console.log("Filtered Song List based on Song Name", response);
        this.songs = response;
        this.filteredSongs = response;
        console.log(this.songs);
      }, error => {
        console.log(error);
      }
    );
  }

  searchArtist(){
    console.log($("#findMe").val());
    this.songlistService.getFilteredArtists($("#findMe").val()).subscribe(
      response => {
        console.log("Filtered Song List based on Artist name", response);
        this.songs = response;
        this.filteredArtists = response;
        console.log(this.songs);
      }, error => {
        console.log(error);
      }
    );
  }
}