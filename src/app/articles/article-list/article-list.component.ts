import { Component, OnInit } from '@angular/core';
import { Article } from 'src/app/models/article';
import { Observable } from 'rxjs';
import { ArticleService } from 'src/app/services/article.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-article-list',
  template: ` <ul>
    <li
      *ngFor="let article of articles$ | async"
      style="border: 1px solid black; padding: 20px; margin-bottom:10px;"
    >
      {{ article.title }}
      <br />
      <!-- <a [routerLink]="['/detail', article.slug]" ]>Read more</a> -->
      <a
        style="cursor: pointer; text-decoration: underline;"
        (click)="onReadMoreClick(article.slug)"
        >Read more</a
      >
      <a
        style="cursor: pointer; text-decoration: underline;margin-left: 1rem"
        (click)="onEditClick(article.slug)"
        >Edit</a
      >
    </li>
  </ul>`,
})
export class ArticleListComponent implements OnInit {
  articles$: Observable<Article[]>;

  constructor(
    private readonly articlesService: ArticleService,
    private readonly router: Router
  ) {}

  ngOnInit(): void {
    this.articles$ = this.articlesService.articles$;
  }

  onReadMoreClick(slug: string): void {
    this.router.navigate(['/articles', slug]);
  }

  onEditClick(slug: string): void {
    this.router.navigate(['/articles', slug, 'edit']);
  }

  checkDeactivated() {
    return true;
  }
}
