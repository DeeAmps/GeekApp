import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MarvelFilteredPage } from './marvel-filtered';

@NgModule({
  declarations: [
    MarvelFilteredPage,
  ],
  imports: [
    IonicPageModule.forChild(MarvelFilteredPage),
  ],
})
export class MarvelFilteredPageModule {}
