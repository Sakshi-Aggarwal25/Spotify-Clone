import { Component, OnInit, Output,Input } from '@angular/core';
import { ListComponent } from './list/list.component';
// import {CdkDragDrop, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';

declare var $:any;

@Component({
  selector: 'app-choice',
  templateUrl: './choice.component.html',
  styleUrls: ['./choice.component.css']
})
export class ChoiceComponent implements OnInit {
  lists: any[];



  // list: ListComponent;
  // heading = {
  //   name : "Top"
  // }
  // @Output() heading:string[] = [
    
  //   'Top Faviourites',
  //   'Most Frequent',
  //   'Pop Music',
  //   'Charts',
  //   'Romantic'
  // ]
  constructor() { 
    this.lists = [];
    this.lists.push({ heading:"Top Favourites"});
    this.lists.push({ heading:"Most Frequent"});
    this.lists.push({ heading:"Pop Music"});
    this.lists.push({ heading:"Charts"});
    this.lists.push({ heading:"Stress Buster"});
  }

  ngOnInit(): void {
    // $(".list").animate({
    //   opacity: '0.7',
    //   height: '1.1rem'
    // });
  }

}
