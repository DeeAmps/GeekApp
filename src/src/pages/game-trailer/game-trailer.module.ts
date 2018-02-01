import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { GameTrailerPage } from './game-trailer';

@NgModule({
  declarations: [
    GameTrailerPage,
  ],
  imports: [
    IonicPageModule.forChild(GameTrailerPage),
  ],
})
export class GameTrailerPageModule {}
