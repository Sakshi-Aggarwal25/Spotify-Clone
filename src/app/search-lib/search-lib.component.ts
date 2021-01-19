import { Component, OnInit } from '@angular/core';
// import { BrowserModule } from '@angular/platform-browser';
// import { FormsModule } from '@angular/forms';

// search module
// import { Ng2SearchPipeModule } from 'ng2-search-filter';

// declare var $:any;
@Component({
  selector: 'app-search-lib',
  templateUrl: './search-lib.component.html',
  styleUrls: ['./search-lib.component.css']
})
export class SearchLibComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }
  searchText;
  songs = [
    { id: 1, name: 'See You Again', musician: 'Wiz Knalifa ft. Charlie Puth' },
    { id: 2, name: 'Sorry' , musician: 'UJustin BieberSA'},
    { id: 3, name: 'Uptown Funk' , musician: 'Mark Ronson ft. Bruno Mars'},
    { id: 4, name: 'Hello' , musician: 'Adele' },
    { id: 5, name: 'Sugar' , musician: 'Maroon 5'},
    { id: 6, name: 'Lean On' , musician: 'Major Lazer'},
    { id: 7, name: 'Roar' , musician: 'Katy Perry'},
    { id: 8, name: 'Levitating' , musician: 'Dua Lipa'},
    { id: 9, name: 'Hero' , musician: 'Enrique'},
    { id: 10, name: 'Low' , musician: 'Akon'}
  ];

  
}


