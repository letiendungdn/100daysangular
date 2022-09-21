import { Component, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Article } from '../models/article';

@Component({
  selector: 'app-home',
  template: `
    <p>home works!</p>
    <ul>
      <li
        *ngFor="let article of articles$ | async"
        style="border: 1px solid black; padding: 20px; margin-bottom:10px;"
      >
        {{ article.title }}
        <br />
        <a href="">Read more</a>
      </li>
    </ul>
  `,
})
export class HomeComponent implements OnInit {
  articles$: Observable<Article[]>;

  constructor() {}

  ngOnInit(): void {
    this.articles$ = of<Article[]>([
      {
        title: 'Title 1',
        body: 'lorem ipsum dolor sit amet, consectetur',
        slug: 'title-1',
      },
      {
        title: 'Title 2',
        body: 'lorem ipsum dolor sit amet, consectetur',
        slug: 'title-2',
      },
    ]);
  }
}
