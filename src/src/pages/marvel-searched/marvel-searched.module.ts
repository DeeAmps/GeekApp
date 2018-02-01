import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MarvelSearchedPage } from './marvel-searched';

@NgModule({
  declarations: [
    MarvelSearchedPage,
  ],
  imports: [
    IonicPageModule.forChild(MarvelSearchedPage),
  ],
})
export class MarvelSearchedPageModule {}
