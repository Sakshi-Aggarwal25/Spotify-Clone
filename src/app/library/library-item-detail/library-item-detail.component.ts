import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {
  FormBuilder,
  FormGroup,
  FormArray,
  FormControl,
  Validators,
} from '@angular/forms';
declare var $: any;

import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { SonglistService } from 'src/app/songlist.service';
import { PlaylistService } from 'src/app/playlist.service';
@Component({
  selector: 'app-library-item-detail',
  templateUrl: './library-item-detail.component.html',
  styleUrls: ['./library-item-detail.component.css'],
})
export class LibraryItemDetailComponent implements OnInit {
  @Input() items: any[];
  toBeAdded : any[];
  form: FormGroup;
  checkArray = [];
  inputTags;
  Listform
  constructor(
    private route: ActivatedRoute,
    private modalService: NgbModal,
    private fb: FormBuilder,
    private router: Router,
    public songlistService: SonglistService,
    public playlistService: PlaylistService
  ) {
    this.router.routeReuseStrategy.shouldReuseRoute = function () {
      return false;
    };
    this.items = [];
    this.form = this.fb.group({
      checkArray: this.fb.array([]),
      temp: this.fb.array([]),
    });
  }

  public playlistName;
  songs: any[];
  mySongs: any[];
  ngOnInit(): void {
    let name = this.route.snapshot.paramMap.get('name');
    this.playlistName = name;

    this.songlistService.getSongList().subscribe(
      (response) => {
        console.log('Song List', response);
        this.songs = response;
        console.log(this.songs);
      },
      (error) => {}
    );

    this.playlistService.getSongsOfPlaylist(this.playlistName).subscribe(
      (response) => {
        console.log('hey', response);
        this.mySongs = response;
        for (let i = 0; i < this.mySongs.length; i++) {
          this.items.push({
            // imagePath: '../assets/Images/image.jpg',
            name: this.mySongs[i].name,
            id: this.mySongs[i].id
          });
        }
        console.log("Items after addition" + this.items);
      },
      (error) => {
        console.log(error);
      }
    );
  }

  isPresent(songName: any){
    for(let i = 0 ; i < this.items.length ; i++){
      if(songName === this.items[i].name){
        return true;
      }
    }
    return false;
  }

  toggletick(e) {
    // e.target.addClass("selected");
  }  

  submitForm() {
    console.log(this.form.value);

    this.makeList();
    
    this.addSongsToPlaylist();
  }

  makeList() {
    this.Listform = document.getElementById("my-form");
    this.inputTags = this.Listform.getElementsByTagName("input");
    this.checkArray = [];
    for(let i = 0 ; i < this.inputTags.length ; i++){
       if(this.inputTags[i].checked){
         console.log(this.inputTags[i].checked);
         this.checkArray.push(this.inputTags[i].defaultValue);
         debugger
       }
    }

    console.log("checkArray" + this.checkArray);
    debugger
    var cur = this.checkArray;
    this.toBeAdded = [];
    for (let i = 0; i < cur.length; i++) {
      this.toBeAdded.push({
        // imagePath: '../assets/Images/image.jpg',
        name: cur[i],
      });
    }
    this.items = this.toBeAdded;
    cur = [];
    // this.checkArray = this.fb.array([]),
    console.log("111" + this.toBeAdded);    
  }

  showSongs() {
    this.playlistService.getSongsOfPlaylist(this.playlistName).subscribe(
      (response) => {
        console.log('hey', response);
        this.mySongs = response;
      },
      (error) => {
        console.log(error);
      }
    );
  }
  addSongsToPlaylist() {

    console.log("131" + this.toBeAdded);
    debugger;
    this.playlistService.updatePlaylist(this.playlistName, {songs:this.toBeAdded}).subscribe(
      (response) => {
        console.log('hey', response);
        this.items = response;
      },
      (error) => {
        console.log(error);
      }
    );
    // this.toBeAdded = [];
  }

  closeResult = '';

  open(content) {
    this.modalService
      .open(content, { ariaLabelledBy: 'modal-basic-title' })
      .result.then(
        (result) => {
          this.closeResult = `Closed with: ${result}`;
        },
        (reason) => {
          this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        }
      );
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }
}
