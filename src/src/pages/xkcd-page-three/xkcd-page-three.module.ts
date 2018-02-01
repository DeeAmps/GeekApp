import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { XkcdPageThreePage } from './xkcd-page-three';

@NgModule({
  declarations: [
    XkcdPageThreePage,
  ],
  imports: [
    IonicPageModule.forChild(XkcdPageThreePage),
  ],
})
export class XkcdPageThreePageModule {}
