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
  @Input() imgQaulity: string = 'medium';

  readonly imagesSizes = IMAGES_SIZES;
  readonly posterImgNotFound: SafeUrl = this.onSanitizeUrl(env.movieNotFoundUrl);
  imgSize: string = IMAGES_SIZES.small;

  constructor(private sanitizer: DomSanitizer) { }

  ngOnInit(): void {
    this.imgSize = this.getImgSize(this.imgQaulity);
  }

  private onSanitizeUrl(url: string): SafeUrl {
    return this.sanitizer.bypassSecurityTrustUrl(url);
  }

  private getImgSize(size: string = 'small' ): string {
    let imgSize = this.imagesSizes.small;

    Object.entries(this.imagesSizes).find(img => {
      if(img[0] === size) {
        imgSize = img[1];
      }
    });

    return imgSize;
  }

}
