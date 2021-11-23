import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {TodoRoutingModule} from './todo-routing.module';
import {ItemComponent} from './components/item/item.component';
import {ItemListComponent} from './components/item-list/item-list.component';
import {CreateItemComponent} from './components/create-item/create-item.component';
import {ToDoService} from './services/dataservices/to-do.service';
import {SharedModule} from '@shared/shared.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

@NgModule({
  declarations: [
    ItemComponent,
    ItemListComponent,
    CreateItemComponent,
  ],
  imports: [
    SharedModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,


    SharedModule,
    TodoRoutingModule,
  ],
  providers: [ToDoService],

})
export class TodoModule {
}
