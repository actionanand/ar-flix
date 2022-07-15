import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, Input, OnInit } from '@angular/core';

import { IMAGES_SIZES } from '../../constants/images-sizes';
import { Movie } from '../../models/movie';

@Component({
  selector: 'app-slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.scss'],
  animations: [
    trigger('slideFade', [
      state('void', style({ opacity: 0 })),
      transition('void <=> *', [animate('1s')])
    ])
  ]
})
export class SliderComponent implements OnInit {

  @Input() items!: Movie[];
  @Input() isBanner: boolean = false;
  @Input() slidingInterval: number = 5000;

  readonly imagesSizes = IMAGES_SIZES;

  currentSlideIndex: number = 0;

  constructor() { }

  onSetInterval(times: number) {
    setInterval(() => {
      this.currentSlideIndex = ++this.currentSlideIndex % this.items.length;
    }, times);
  }

  ngOnInit(): void {
    !this.isBanner && this.onSetInterval(this.slidingInterval);
  }

}