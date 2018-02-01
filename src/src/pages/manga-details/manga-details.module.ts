import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MangaDetailsPage } from './manga-details';

@NgModule({
  declarations: [
    MangaDetailsPage,
  ],
  imports: [
    IonicPageModule.forChild(MangaDetailsPage),
  ],
})
export class MangaDetailsPageModule {}
