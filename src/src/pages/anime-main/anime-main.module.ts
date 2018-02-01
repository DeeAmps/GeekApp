import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AnimeMainPage } from './anime-main';

@NgModule({
  declarations: [
    AnimeMainPage,
  ],
  imports: [
    IonicPageModule.forChild(AnimeMainPage),
  ],
})
export class AnimeMainPageModule {}
