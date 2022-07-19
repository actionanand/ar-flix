import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';

import { first } from 'rxjs';

import { IMAGES_SIZES } from '../../shared/constants/images-sizes';
import { environment as env } from 'src/environments/environment';
import { CastAndCrew, Person } from '../../models/person';
import { CastService } from '../../services/cast.service';

@Component({
  selector: 'app-cast',
  templateUrl: './cast.component.html',
  styleUrls: ['./cast.component.scss']
})
export class CastComponent implements OnInit {

  readonly imagesSizes = IMAGES_SIZES;
  readonly manPlaceholderImg: SafeUrl = this.onSanitizeUrl(env.manPlaceholderImg);
  idmbUrl: SafeUrl = this.onSanitizeUrl(env.idmbUserUrl);

  person: Person | null = null;
  personCredits: CastAndCrew[] = [];

  constructor(private sanitizer: DomSanitizer, private route: ActivatedRoute, private personServ: CastService) { }

  getPersonDetail(id: string) {
    this.personServ.getPersonDetail(id).subscribe(resp => {
      this.person = resp;
      this.idmbUrl = this.onSanitizeUrl(`${env.idmbUrl}/${this.person.imdb_id}`);
      // console.log(this.person );
    });
  }

  getPersonMovieCredit(id: string) {
    this.personServ.getPersonMovieCredit(id).subscribe(resp => {
      this.personCredits = resp;
    });
  }

  ngOnInit(): void {
    this.route.params.pipe(first()).subscribe(({personId}) => {
      this.getPersonDetail(personId);
      this.getPersonMovieCredit(personId);
    });
  }

  get getGender(): string {
    const gender = this.person?.gender;

    if (gender == 1) {
      return 'Female';
    } else if (gender == 2) {
      return 'Male';
    } else {
      return 'Unkown';
    }
  }

  private onSanitizeUrl(url: string) {
    return this.sanitizer.bypassSecurityTrustUrl(url);
  }

}
