import {
  Component,
  OnInit,
  EventEmitter,
  Output,
} from '@angular/core';
import { Router } from '@angular/router';
import { PlaylistService } from '../playlist.service';
@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css'],
})
export class MenuComponent implements OnInit {
  @Output() featureSelected = new EventEmitter<string>();
  playlists;
  constructor(
    private router: Router,
    public playlistService: PlaylistService
  ) {}

  ngOnInit(): void {
    this.playlistService.getPlaylist();
  }

  onSelect(feature: string) {
    this.featureSelected.emit(feature);
  }
  choosePlaylist(playlist) {
    this.router.navigate(['/library', playlist.name]);
  }
}
