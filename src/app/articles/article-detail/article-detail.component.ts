import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { filter, Observable, pluck, switchMap } from 'rxjs';
import { Article } from '../../models/article';
import { ArticleService } from '../../services/article.service';

@Component({
  selector: 'app-article-detail',
  template: `
    <ng-container *ngIf="article$ | async as article; else noArticle">
      <h1>{{ article.title }}</h1>
      <p>{{ article.body }}</p>
    </ng-container>
    <ng-template #noArticle> No article found </ng-template>
  `,
})
export class ArticleDetailComponent implements OnInit {
  article$: Observable<Article | undefined>;
  constructor(
    private readonly route: ActivatedRoute,
    private readonly articleService: ArticleService
  ) {}

  ngOnInit(): void {
    // this.route.params.subscribe(console.log); //slug
    // this.route.paramMap.subscribe(console.log);

    // console.log(this.route.snapshot.params);
    // console.log(this.route.snapshot.paramMap);

    this.article$ = this.route.params.pipe(
      pluck('slug'),
      switchMap((slug) => this.articleService.getArticle(slug)),
      filter((article) => !!article)
    );
  }
}
