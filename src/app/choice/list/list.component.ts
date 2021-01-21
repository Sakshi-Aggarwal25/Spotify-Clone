import { Component, Input, OnInit , Output} from '@angular/core';
declare var $:any;

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {
  @Input() items : any[];


  @Input() heading: string;
  constructor() { 
    // this.items = [];
    // this.items.push({imagePath:"../assets/Images/image.jpg", desc: "My first song"});
    // this.items.push({imagePath:"../assets/Images/image.jpg", desc: "My sec song"});
    // this.items.push({imagePath:"../assets/Images/image.jpg", desc: "My third song"});
    // this.items.push({imagePath:"../assets/Images/image.jpg", desc: "My fourth song"});
  }

  ngOnInit(): void {
    // $("app-item").click(function(){
      // var cur = $(this);
      // cur.animate({
      //   opacity: '0.7',
      //   height: '+=1px',
      //   width: '+=1px'
      // }, "200");
      // cur.animate({
      //   opacity: '1',
      //   height: '-=1px',
      //   width: '-=1px'
      // },"fast");
      // $("#one").fadeTo("slow" , 0.3);
    // })


    $(".min").click(function(event){

      $(event.target.parentElement.nextElementSibling).toggle();
      // if($(event.target).text() === '^'){
      //   $(event.target).html('-');
      // }
    //   $(event.target).html(function(text){
    //     return text === "^" ? "-" : "^";
    // })
      // $("app-item").toggle();
      const x = event.target;
      if (x.innerHTML === "^") {
        x.innerHTML = "-";
      } else {
        x.innerHTML = "^";
      }
    })
    
  }

}
