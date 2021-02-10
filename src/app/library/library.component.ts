import { Component, OnInit } from '@angular/core';
import { Playlist } from '../shared/playlist.model';
import { Router } from '@angular/router';
import { PlaylistService } from '../playlist.service';
import { HttpClient } from '@angular/common/http';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
declare var $: any;

@Component({
  selector: 'app-library',
  templateUrl: './library.component.html',
  styleUrls: ['./library.component.css'],
})
export class LibraryComponent implements OnInit {
  constructor(
    private router: Router,
    public playlistService: PlaylistService,
    public httpClient: HttpClient,
    private modalService: NgbModal
  ) {}
  playlists;
  ngOnInit(): void {
    this.playlistService.getPlaylist();
  }

  onAddItem() {
    const plName = $('#name').val();
   const d = {
      name: plName,
      song: [],
      userID: '1002',
    };
   
    this.playlistService.addToPlaylist(d);
  }

  closeResult = '';
  open(content) {
    this.modalService
      .open(content, {
        ariaLabelledBy: 'modal-basic-title',
        centered: true,
        size: 'lg',
      })
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

  choosePlaylist(playlist) {
    this.router.navigate(['/library', playlist.name]);
  }
}