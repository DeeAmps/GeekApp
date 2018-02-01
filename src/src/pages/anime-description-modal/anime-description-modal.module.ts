import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AnimeDescriptionModalPage } from './anime-description-modal';

@NgModule({
  declarations: [
    AnimeDescriptionModalPage,
  ],
  imports: [
    IonicPageModule.forChild(AnimeDescriptionModalPage),
  ],
})
export class AnimeDescriptionModalPageModule {}
