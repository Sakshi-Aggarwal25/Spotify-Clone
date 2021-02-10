import { Component, Input, OnInit } from '@angular/core';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
declare var $:any;
@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.css']
})
export class ItemComponent {
  
  @Input() imagePath : "../assets/Images/image.jpg";
  @Input() desc : string;
  @Input() path : string;
  constructor(private modalService: NgbModal) { }

  // ngOnInit(): void {
    // $(".card").hover(function(){
    //   var cur = this;
    //   $(cur).fadeTo(200, 0.7);
    // }, 
    // function(){
    //   $(this).fadeTo(200 , 1);
    // });
  // }
  closeResult = '';
  open(content) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title', centered: true , size: 'lg'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
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