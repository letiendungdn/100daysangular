import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { articlesRoutes } from './articles.routes';
import { ArticleListComponent } from './article-list/article-list.component';
import { ArticleDetailComponent } from './article-detail/article-detail.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  imports: [CommonModule, FormsModule, RouterModule.forChild(articlesRoutes)],
  exports: [],
  declarations: [ArticleListComponent, ArticleDetailComponent],
  providers: [],
})
export class ArticlesModule {}
