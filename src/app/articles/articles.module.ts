import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { articlesRoutes } from './articles.routes';
import { ArticleListComponent } from './article-list/article-list.component';
import { ArticleDetailComponent } from './article-detail/article-detail.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ArticleDetailEditComponent } from './article-detail-edit/article-detail-edit.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(articlesRoutes),
  ],
  exports: [FormsModule, ReactiveFormsModule],
  declarations: [
    ArticleListComponent,
    ArticleDetailComponent,
    ArticleDetailEditComponent,
  ],
  providers: [],
})
export class ArticlesModule {}
