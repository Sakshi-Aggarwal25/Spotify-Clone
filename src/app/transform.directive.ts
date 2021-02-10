import { Directive, ElementRef, HostListener, OnInit, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appTransform]'
})
export class TransformDirective implements OnInit {
  constructor(private elRef: ElementRef, private renderer: Renderer2) { }

  ngOnInit(){

  }

  @HostListener('mouseenter') mouseover(eventData: Event){
    this.renderer.setStyle(this.elRef.nativeElement, 'background-color', 'black');
    
  }

  @HostListener('mouseleave') mouseleaver(eventData: Event){
    this.renderer.setStyle(this.elRef.nativeElement, 'background-color', 'transparent'); 
  }
}
