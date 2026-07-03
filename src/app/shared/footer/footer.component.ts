import { Component, OnInit } from '@angular/core';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {

  date: Date = new Date();
  title = 'AR Flix';
  readonly newAppUrl = environment.newAppUrl;

  constructor() { }

  ngOnInit(): void {
  }

}
