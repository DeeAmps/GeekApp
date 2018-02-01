import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { LatestGamesPage } from './latest-games';

@NgModule({
  declarations: [
    LatestGamesPage,
  ],
  imports: [
    IonicPageModule.forChild(LatestGamesPage),
  ],
})
export class LatestGamesPageModule {}
