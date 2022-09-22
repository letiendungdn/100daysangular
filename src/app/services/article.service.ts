import { Injectable } from '@angular/core';
import { map, Observable, of } from 'rxjs';
import { shareReplay } from 'rxjs/operators';
import { Article } from '../models/article';

@Injectable({ providedIn: 'root' })
export class ArticleService {
  constructor() {}
  get articles$() {
    return of<Article[]>([
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
    ]).pipe(shareReplay(1));
  }

  getArticle(slug: string): Observable<Article | undefined> {
    return this.articles$.pipe(
      map((article) => article.find((ar) => ar.slug === slug))
    );
  }
}
