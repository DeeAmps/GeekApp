import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { XkcdMainPage } from './xkcd-main';

@NgModule({
  declarations: [
    XkcdMainPage,
  ],
  imports: [
    IonicPageModule.forChild(XkcdMainPage),
  ],
})
export class XkcdMainPageModule {}
