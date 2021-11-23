import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {LoaderComponent} from '@shared/components/loader/loader.component';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatTableModule} from '@angular/material/table';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';

@NgModule({
  declarations: [
    LoaderComponent
  ],
  imports: [
    MatProgressSpinnerModule,
    CommonModule,
  ],
  exports: [
    LoaderComponent,
    MatTableModule,
    MatFormFieldModule,
    MatInputModule,
  ]
})
export class SharedModule {
}
