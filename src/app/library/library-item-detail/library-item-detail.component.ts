import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {
  FormBuilder,
  FormGroup,
  FormArray,
  FormControl,
  Validators,
} from '@angular/forms';
declare var $: any;

import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
@Component({
  selector: 'app-library-item-detail',
  templateUrl: './library-item-detail.component.html',
  styleUrls: ['./library-item-detail.component.css'],
})
export class LibraryItemDetailComponent implements OnInit {
  @Input() items : any[];

  form: FormGroup;
  Data: Array<any> = [
    { name: 'See you again', value: 'See you again' },
    { name: 'Sorry', value: 'Sorry' },
    { name: 'Hero', value: 'Hero' },
    { name: 'Low', value: 'Low' },
    { name: 'Roar', value: 'Roar' },
    { name: 'Sugar', value: 'Sugar' },
    { name: 'Hello', value: 'Sugar' },
    { name: 'Alone', value: 'Alone' },
    { name: 'Faded', value: 'Faded' },
    { name: 'Mirror', value: 'Mirror' },
  ];
  
  constructor(
    private route: ActivatedRoute,
    private modalService: NgbModal,
    private fb: FormBuilder,
    private router: Router

  ) {
    this.router.routeReuseStrategy.shouldReuseRoute = function () {
      return false;
    };
    this.items = [];
    // this.items.push({imagePath:"../assets/Images/image.jpg", desc: "My first song"});


    this.form = this.fb.group({
      checkArray: this.fb.array([]),
      temp: this.fb.array([]),
    });
  }

  public playlistName;
  
  ngOnInit(): void {
    let name = this.route.snapshot.paramMap.get('name');
    this.playlistName = name;
  }


  checkArray: FormArray;
  temp: FormArray;
  toggletick(e){
    // e.target.addClass("selected");
  }
  onCheckboxChange(e) {
    this.checkArray = this.form.get('checkArray') as FormArray;

    if (e.target.checked) {
      this.checkArray.push(new FormControl(e.target.value));
    } else {
      let i: number = 0;
      this.checkArray.controls.forEach((item: FormControl) => {
        if (item.value == e.target.value) {
          this.checkArray.removeAt(i);
          return;
        }
        i++;
      });
    }
  }

  submitForm() {
    console.log(this.form.value);
    this.makeList();
    this.checkArray = this.temp;
  }
  makeList() {
    
    var cur= this.checkArray.value;
    for (let i = 0; i < cur.length; i++) {

      // var li = '<li style="border: solid 1px #ccc; text-transform: capitalize;text-align: center;min-height: 60px;background: white;border-radius: 4px;overflow: hidden;display: block; margin: 5px;padding: 10px;">' + cur[i] + '</li>';
      // $('#myList ul').append(li);

      
    this.items.push({imagePath:"../assets/Images/image.jpg", desc: cur[i]});
    }
  }


  
  closeResult = '';

  open(content) {
    this.modalService
      .open(content, { ariaLabelledBy: 'modal-basic-title' })
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
