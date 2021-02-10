import { Component, OnInit, Output, Input } from '@angular/core';
import { ChartService } from '../chart.service';
declare var $: any;
@Component({
  selector: 'app-choice',
  templateUrl: './choice.component.html',
  styleUrls: ['./choice.component.css'],
})
export class ChoiceComponent implements OnInit {
  lists: any[];
  obj = [];

  constructor(public chartsService: ChartService) {
  }

  ngOnInit(): void {
    this.chartsService.getCharts().subscribe(
      (response) => {
        this.lists = response;
        this.obj = response.name;
      },
      (error) => {
        console.log(error);
      }
    );
  }
}