import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ComicCharacterDetailsPage } from './comic-character-details';

@NgModule({
  declarations: [
    ComicCharacterDetailsPage,
  ],
  imports: [
    IonicPageModule.forChild(ComicCharacterDetailsPage),
  ],
})
export class ComicCharacterDetailsPageModule {}
