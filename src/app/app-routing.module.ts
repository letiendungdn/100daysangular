import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ChildHomeComponent } from './home/child-home/child-home.component';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
  {
    path: 'home',
    component: HomeComponent,
    children: [{ path: 'child', component: ChildHomeComponent }],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
