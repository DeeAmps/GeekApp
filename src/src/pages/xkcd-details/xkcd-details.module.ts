import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { XkcdDetailsPage } from './xkcd-details';

@NgModule({
  declarations: [
    XkcdDetailsPage,
  ],
  imports: [
    IonicPageModule.forChild(XkcdDetailsPage),
  ],
})
export class XkcdDetailsPageModule {}
