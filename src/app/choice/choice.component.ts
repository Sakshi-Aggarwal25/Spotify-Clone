import { Component, OnInit, Output,Input } from '@angular/core';
import { ChartService } from '../chart.service';
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
  obj = [];
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
  constructor(public chartsService: ChartService) { 
    // this.lists = [];
    // this.lists.push({ heading:"Top Favourites"});
    // this.lists.push({ heading:"Most Frequent"});
    // this.lists.push({ heading:"Pop Music"});
    // this.lists.push({ heading:"Charts"});
    // this.lists.push({ heading:"Stress Buster"});
  }

  ngOnInit(): void {
    this.chartsService.getCharts().subscribe(
      response => {
        console.log("hey", response);
        this.lists = response;
        this.obj = response.name;
      }, error => {

      }
    );
  }

}
