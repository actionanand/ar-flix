import { Component, Input, OnDestroy, OnInit } from '@angular/core';

import { IMAGES_SIZES } from '../../shared/constants/images-sizes';
import { Item } from '../../models/item';
import { SLIDE_FADE } from '../../shared/animations/fade.animation';

@Component({
  selector: 'app-slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.scss'],
  animations: [SLIDE_FADE]
})
export class SliderComponent implements OnInit, OnDestroy {

  @Input() items!: Item[];
  @Input() isBanner: boolean = false;
  @Input() slidingInterval: number = 5000;

  readonly imagesSizes = IMAGES_SIZES;

  currentSlideIndex: number = 0;
  sliderIntervalRef: any = null;

  constructor() { }
  
  onSetInterval(times: number) {
    this.sliderIntervalRef = setInterval(() => {
      this.currentSlideIndex = ++this.currentSlideIndex % this.items.length;
    }, times);
  }
  
  ngOnInit(): void {
    !this.isBanner && this.onSetInterval(this.slidingInterval);
  }
  
  ngOnDestroy(): void {
    this.sliderIntervalRef && clearInterval(this.sliderIntervalRef);
  }
}