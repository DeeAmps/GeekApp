import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ListBooksPage } from './list-books';

@NgModule({
  declarations: [
    ListBooksPage,
  ],
  imports: [
    IonicPageModule.forChild(ListBooksPage),
  ],
})
export class ListBooksPageModule {}
