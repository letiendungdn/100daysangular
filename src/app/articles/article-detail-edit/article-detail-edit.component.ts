import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { filter, Observable, pluck, Subject, switchMap, takeUntil } from 'rxjs';
import { Article } from 'src/app/models/article';
import { ArticleService } from 'src/app/services/article.service';

@Component({
  selector: 'app-article-detail-edit',
  template: ` <form [formGroup]="form$ |"></form> `,
})
export class ArticleDetailEditComponent implements OnInit, OnDestroy {
  private readonly $destroy = new Subject();

  form$: Observable<FormGroup>;
  private initialFormValue: unknown;

  constructor(
    private readonly fb: FormBuilder,
    private readonly route: ActivatedRoute,
    private readonly articleService: ArticleService
  ) {}

  ngOnInit(): void {
    this.route.params.pipe(
      pluck('slug'),
      switchMap((slug) => this.articleService.getArticle(slug)),
      filter((article) => !!article),
      takeUntil(this.$destroy)
    );
  }

  ngOnDestroy(): void {
    this.$destroy.next(null);
  }

  private initForm(article: Article): FormGroup {
    const form = this.fb.group({
      title: [article.title],
      body: [article.body],
    });
    this.initialFormValue = form.getRawValue();
    return form;
  }
}
