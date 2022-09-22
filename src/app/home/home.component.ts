import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { Article } from '../models/article';
import { ArticleService } from '../services/article.service';

@Component({
  selector: 'app-home',
  template: ` <p>home works!</p> `,
})
export class HomeComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
}
