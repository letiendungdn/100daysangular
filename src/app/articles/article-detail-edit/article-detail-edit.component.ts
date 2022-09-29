import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import {
  ActivatedRoute,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
} from '@angular/router';
import { Observable, of, Subject } from 'rxjs';
import {
  filter,
  pluck,
  shareReplay,
  switchMap,
  take,
  takeUntil,
} from 'rxjs/operators';
import { CheckDeactivate } from 'src/app/check-deactivate';
import { Article } from 'src/app/models/article';
import { ArticleService } from 'src/app/services/article.service';

@Component({
  selector: 'app-article-detail-edit',
  template: `
    <form [formGroup]="form$ | async">
      <label for="title">title</label>
      <input type="text" id="title" formControlName="title" />
      <br />
      <label for="body">Body</label>
      <textarea id="body" formControlName="body"></textarea>
      <br />
    </form>
  `,
})
export class ArticleDetailEditComponent
  implements OnInit, OnDestroy, CheckDeactivate
{
  private readonly $destroy = new Subject();

  form$: Observable<FormGroup>;
  private initialFormValue: unknown;

  constructor(
    private readonly fb: FormBuilder,
    private readonly route: ActivatedRoute,
    private readonly articleService: ArticleService
  ) {}
  ngOnInit(): void {
    // this.route.params.pipe(
    //   pluck('slug'),
    //   switchMap((slug) => this.articleService.getArticle(slug)),
    //   filter((article) => !!article),
    //   takeUntil(this.$destroy)
    // );
    this.form$ = this.route.params.pipe(
      pluck('slug'),
      switchMap((slug) => this.articleService.getArticle(slug)),
      filter((article) => !!article),
      switchMap((article) => of(this.initForm(article))),
      shareReplay(1)
    );
  }

  checkDeactivate(): Observable<boolean> {
    let formValue = {};
    this.form$.pipe(take(1)).subscribe((value) => {
      formValue = value;
    });
    const isEdited =
      JSON.stringify(this.initialFormValue) !== JSON.stringify(formValue);
    return of(!isEdited || confirm('Do you want to cancel changes?'));
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
