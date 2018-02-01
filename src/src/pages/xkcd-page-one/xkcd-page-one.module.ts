import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { XkcdPageOnePage } from './xkcd-page-one';

@NgModule({
  declarations: [
    XkcdPageOnePage,
  ],
  imports: [
    IonicPageModule.forChild(XkcdPageOnePage),
  ],
})
export class XkcdPageOnePageModule {}
