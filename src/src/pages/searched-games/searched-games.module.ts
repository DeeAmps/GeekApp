import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SearchedGamesPage } from './searched-games';

@NgModule({
  declarations: [
    SearchedGamesPage,
  ],
  imports: [
    IonicPageModule.forChild(SearchedGamesPage),
  ],
})
export class SearchedGamesPageModule {}
