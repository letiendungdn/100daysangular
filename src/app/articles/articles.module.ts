import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { articlesRoutes } from './articles.routes';
import { ArticleListComponent } from './article-list/article-list.component';
import { ArticleDetailComponent } from './article-detail/article-detail.component';

@NgModule({
  imports: [CommonModule, RouterModule.forChild(articlesRoutes)],
  exports: [],
  declarations: [ArticleListComponent, ArticleDetailComponent],
  providers: [],
})
export class ArticlesModule {}
