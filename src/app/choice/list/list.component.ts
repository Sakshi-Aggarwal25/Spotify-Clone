import { Component, Input, OnInit, Output } from '@angular/core';
declare var $: any;
declare const move: any;
declare const left: any;
declare const right: any;
declare const scrollMenu: any;
@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css'],
})
export class ListComponent implements OnInit {
  menuPosition: any;
  menuEndOffset: number;
  // duration of scroll animation
  scrollDuration = 300;
  // paddles
  leftPaddle = document.getElementsByClassName('left-paddle');
  rightPaddle = document.getElementsByClassName('right-paddle');
  // get items dimensions
  itemsLength = $('.item').length;
  itemSize = $('.item').outerWidth(true);
  // get some relevant size for the paddle triggering point
  paddleMargin = 20;
  // get wrapper width
  getMenuWrapperSize = function () {
    return $('.menu-wrapper').outerWidth();
  };
  menuWrapperSize = this.getMenuWrapperSize();

  // size of the visible part of the menu is equal as the wrapper size
  menuVisibleSize = this.menuWrapperSize;

  // get total width of all menu items
  getMenuSize = function () {
    return this.itemsLength * this.itemSize;
  };
  menuSize = this.getMenuSize();
  // get how much of menu is invisible
  menuInvisibleSize = this.menuSize - this.menuWrapperSize;

  // get how much have we scrolled to the left
  getMenuPosition = function () {
    return $('.menu').scrollLeft();
  };

  @Input() items: any[];
  @Input() heading: string;
  constructor() {}

  ngOnInit(): void {
    $('.min').click(function (event) {
      event.stopImmediatePropagation();
      $(event.target.parentElement.nextElementSibling).toggle();
      const x = event.target;
      if (x.innerHTML === '^') {
        x.innerHTML = 'v';
      } else {
        x.innerHTML = '^';
      }
    });
  }

  onClick() {
    move();
  }
  Onright() {
    right();
  }
  Onleft() {
    left();
  }
  scrollNow() {
    scrollMenu();
  }
}
