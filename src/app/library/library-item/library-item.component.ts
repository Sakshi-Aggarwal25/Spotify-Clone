import { HttpClient } from '@angular/common/http';
import {
  Component,
  OnInit,
  ViewChild,
  ElementRef,
  Output,
  EventEmitter,
} from '@angular/core';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { PlaylistService } from 'src/app/playlist.service';
import { Playlist } from '../../shared/playlist.model';
declare var $: any;
@Component({
  selector: 'app-library-item',
  templateUrl: './library-item.component.html',
  styleUrls: ['./library-item.component.css'],
})
export class LibraryItemComponent implements OnInit {
  @ViewChild('nameInput', { static: false }) nameInputRef: ElementRef;
  @Output() playlistAdded = new EventEmitter<Playlist>();
  constructor(
    public playlistService: PlaylistService,
    public httpClient: HttpClient,
    private modalService: NgbModal
  ) {}

  ngOnInit(): void {}
  playlists: any[];
  canShow = false;
  onAddItem() {
    // const plName = this.nameInputRef.nativeElement.value;
    const plName = $('#name').val();
    console.log('plName ' + plName);
    // const newPlaylist = new Playlist(plName );
    // this.playlistAdded.emit(newPlaylist);

    // this.nameInputRef.nativeElement.value = "";

    const d = {
      name: plName,
      song: [],
      userID: '1002',
    };
    this.playlistService.addToPlaylist(d);
    // .subscribe(
    //   (response) => {
    //     console.log('hey', response);
    //     debugger
    //     this.playlists = response; 
    //   },
    //   (error) => {
    //     console.log(error);
    //   }
    // );
  }
  onClick() {
    this.canShow = !this.canShow;
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
}
