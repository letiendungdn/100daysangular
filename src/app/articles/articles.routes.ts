import { Routes } from '@angular/router';
import { ArticlesGuard } from '../guards/articles.guard';
import { ArticleDetailEditComponent } from './article-detail-edit/article-detail-edit.component';
import { ArticleDetailComponent } from './article-detail/article-detail.component';
import { ArticleListComponent } from './article-list/article-list.component';

export const articlesRoutes: Routes = [
  { path: '', component: ArticleListComponent }, // article/
  {
    path: ':slug',
    canActivateChild: [ArticlesGuard],
    children: [
      { path: '', component: ArticleDetailComponent },
      {
        path: 'edit',
        component: ArticleDetailEditComponent,
        canActivateChild: [ArticlesGuard],
      },
    ],
  }, // article/:slug
];
// export const articlesRoutes: Routes = [
//   {
//     path: 'articles',
//     children: [
//       { path: '', component: ArticleListComponent }, // article/
//       { path: ':slug', component: ArticleDetailComponent }, // article/:slug
//     ],
//   },
// ];
