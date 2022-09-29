import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  CanActivateChild,
  CanDeactivate,
  CanLoad,
  Route,
  RouterStateSnapshot,
  UrlSegment,
  UrlTree,
} from '@angular/router';
import { map, Observable, of } from 'rxjs';
import { ArticleDetailEditComponent } from '../articles/article-detail-edit/article-detail-edit.component';
import { CheckDeactivate } from '../check-deactivate';
import { AuthService } from '../services/auth.service';

@Injectable({ providedIn: 'root' })
export class ArticlesGuard
  implements
    CanActivate,
    CanActivateChild,
    CanLoad,
    CanDeactivate<CheckDeactivate>
{
  constructor(private readonly authService: AuthService) {}
  canDeactivate(
    component: CheckDeactivate,
    currentRoute: ActivatedRouteSnapshot,
    currentState: RouterStateSnapshot,
    nextState?: RouterStateSnapshot | undefined
  ): Observable<boolean> {
    return component.checkDeactivate(currentRoute, currentState, nextState);
  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    return this.authService.currentUser.pipe(map((user) => !!user));
  }
  canActivateChild(
    childRoute: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> {
    const targetSlug = childRoute.params.slug;
    if (!targetSlug) {
      return of(false);
    }
    return this.authService.currentUser.pipe(
      map((user) => user.articles.includes(targetSlug))
    );
  }

  canLoad(route: Route, segments: UrlSegment[]): Observable<boolean> {
    return this.authService.currentUser.pipe(map((user) => !!user));
  }
}
