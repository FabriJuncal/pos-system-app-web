import { Directive, ElementRef, AfterViewInit } from '@angular/core';
import { Tooltip } from 'bootstrap';

@Directive({
  selector: '[appTooltip]'
})
export class TooltipDirective implements AfterViewInit  {

  constructor(private el: ElementRef) { }

  ngAfterViewInit(): void {
    new Tooltip(this.el.nativeElement);
  }

}
