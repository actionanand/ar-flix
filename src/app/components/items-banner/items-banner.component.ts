import { Component, Input, OnInit } from '@angular/core';

import { Item } from '../../models/item';

@Component({
  selector: 'app-items-banner',
  templateUrl: './items-banner.component.html',
  styleUrls: ['./items-banner.component.scss']
})
export class ItemsBannerComponent implements OnInit {

  @Input() items: Item[] = [];
  @Input() title: string = '';

  constructor() { }

  ngOnInit(): void {
  }

}
