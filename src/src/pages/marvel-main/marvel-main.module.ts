import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MarvelMainPage } from './marvel-main';

@NgModule({
  declarations: [
    MarvelMainPage,
  ],
  imports: [
    IonicPageModule.forChild(MarvelMainPage),
  ],
})
export class MarvelMainPageModule {}
