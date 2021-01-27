import { Component, Input, OnInit } from '@angular/core';
declare var $:any;
@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.css']
})
export class ItemComponent implements OnInit {
  
  @Input() imagePath : "../assets/Images/image.jpg";
  @Input() desc : string;
  constructor() { }

  ngOnInit(): void {
    $(".card").hover(function(){
      var cur = this;
      $(cur).fadeTo(200, 0.7);
    }, 
    function(){
      $(this).fadeTo(200 , 1);
    });
  }

}
