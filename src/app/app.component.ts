import { Component, OnInit } from '@angular/core';

declare var $:any;
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent  {

  title = 'spotify';
  
  loadedFeature = 'home';
  onNavigate(feature: string){
    this.loadedFeature = feature;
  }
}
