import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { OtherComicsMainPage } from './other-comics-main';

@NgModule({
  declarations: [
    OtherComicsMainPage,
  ],
  imports: [
    IonicPageModule.forChild(OtherComicsMainPage),
  ],
})
export class OtherComicsMainPageModule {}
