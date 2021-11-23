import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {CreateItemComponent} from './components/create-item/create-item.component';
import {ItemListComponent} from './components/item-list/item-list.component';
import {ItemComponent} from './components/item/item.component';

const routes: Routes = [
  {path: '', pathMatch: 'full', component: ItemListComponent},
  {path: 'create', component: CreateItemComponent},
  {path: 'update/:id', component: CreateItemComponent},
  {path: ':id', component: ItemComponent},
  {path: '**', redirectTo: ''}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TodoRoutingModule {
}
