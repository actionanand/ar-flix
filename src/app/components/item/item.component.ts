import { Component, Input, OnInit } from '@angular/core';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';

import { IMAGES_SIZES } from '../../shared/constants/images-sizes';
import { Item } from '../../models/item';
import { environment as env } from 'src/environments/environment';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.scss']
})
export class ItemComponent implements OnInit {

  @Input() itemData: Item | null = null;

  readonly imagesSizes = IMAGES_SIZES;
  readonly posterImgNotFound: SafeUrl = this.onSanitizeUrl(env.movieNotFoundUrl);

  constructor(private sanitizer: DomSanitizer) { }

  ngOnInit(): void {
  }

  private onSanitizeUrl(url: string): SafeUrl {
    return this.sanitizer.bypassSecurityTrustUrl(url);
  }

}
