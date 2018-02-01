import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ComingSoonGamesPage } from './coming-soon-games';

@NgModule({
  declarations: [
    ComingSoonGamesPage,
  ],
  imports: [
    IonicPageModule.forChild(ComingSoonGamesPage),
  ],
})
export class ComingSoonGamesPageModule {}
