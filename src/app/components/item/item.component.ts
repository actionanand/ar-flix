import { Component, Input, OnInit } from '@angular/core';

import { IMAGES_SIZES } from '../../shared/constants/images-sizes';
import { Item } from '../../models/item';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.scss']
})
export class ItemComponent implements OnInit {

  @Input() itemData: Item | null = null;

  readonly imagesSizes = IMAGES_SIZES;

  constructor() { }

  ngOnInit(): void {
  }

}
