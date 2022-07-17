import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';

import { Subscription } from 'rxjs';

import { mapTvShowToItem, TvShow, TvShowCredits, TvShowImages, TvShowVideo } from '../../models/tv';
import { Item } from '../../models/item';
import { IMAGES_SIZES } from '../../shared/constants/images-sizes';
import { TvShowsService } from '../../services/tv-shows.service';
import { environment as env } from 'src/environments/environment';
import { CAROUSEL_RESPONSIVE_CONST } from '../../shared/constants/carousel-reponsive-constant';

@Component({
  selector: 'app-tv-show',
  templateUrl: './tv-show.component.html',
  styleUrls: ['./tv-show.component.scss']
})
export class TvShowComponent implements OnInit, OnDestroy {

  readonly imagesSizes = IMAGES_SIZES;
  readonly manPlaceholderImg: SafeUrl = this.onSanitizeUrl(env.manPlaceholderImg);

  paramSub!: Subscription;

  showNetwork: boolean = false;

  responsiveOptions = CAROUSEL_RESPONSIVE_CONST;

  tvShow: TvShow | null = null;
  tvShowBanner: Item | null = null;
  similarTvShows: Item[] = [];
  tvShowVideos: TvShowVideo[] = [];
  tvShowImages: TvShowImages | null = null;
  tvShowCredits: TvShowCredits | null = null;

  constructor(private route: ActivatedRoute, private tvServ: TvShowsService, private sanitizer: DomSanitizer) { }

  getTvShow(id: string) {
    this.tvServ.getTvShow(id).subscribe(resp => {
      this.tvShowBanner = mapTvShowToItem(resp);
      this.tvShow = resp;
      if(this.tvShow.networks.length > 3) {
        this.showNetwork = true;
      }
    });
  }

  getTvShowVideos(id: string) {
    this.tvServ.getTvShowVideos(id).subscribe(resp => {
      this.tvShowVideos = resp;
    });
  }

  getTvShowImages(id: string) {
    this.tvServ.getTvShowImages(id).subscribe(resp => {
      this.tvShowImages = resp;
    });
  }

  getTvShowCredits(id: string) {
    this.tvServ.getTvShowCredits(id).subscribe(resp => {
      this.tvShowCredits = resp;
    });
  }

  getSimilarTvShows(id: string) {
    this.tvServ.getTvShowSimilar(id).subscribe(resp => {
      this.similarTvShows = resp.map(tvShow => mapTvShowToItem(tvShow))
    });
  }

  ngOnInit(): void {
    this.paramSub = this.route.params.subscribe(({ id }) => {
      this.getTvShow(id);
      this.getTvShowVideos(id);
      this.getTvShowImages(id);
      this.getTvShowCredits(id);
      this.getSimilarTvShows(id);
    });
  }

  ngOnDestroy(): void {
    this.paramSub && this.paramSub.unsubscribe();
  }

  private onSanitizeUrl(url: string) {
    return this.sanitizer.bypassSecurityTrustUrl(url)
  }

}
