import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ComicCharacterSearchPage } from './comic-character-search';

@NgModule({
  declarations: [
    ComicCharacterSearchPage,
  ],
  imports: [
    IonicPageModule.forChild(ComicCharacterSearchPage),
  ],
})
export class ComicCharacterSearchPageModule {}
