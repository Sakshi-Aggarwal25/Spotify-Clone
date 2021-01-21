import { Component, OnInit } from '@angular/core';

declare var $:any;
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  ngOnInit(){
    // $("#hide").click(function(){
    //   $("h1").hide();
    // });

    // $("#show").click(function(){
    //   $("h1").show();
    // });
  }
  title = 'spotify';
  
  loadedFeature = 'home';
  onNavigate(feature: string){
    this.loadedFeature = feature;
  }
}

// node Server.js
