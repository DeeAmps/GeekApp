import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TvDetailsPage } from './tv-details';

@NgModule({
  declarations: [
    TvDetailsPage,
  ],
  imports: [
    IonicPageModule.forChild(TvDetailsPage),
  ],
})
export class TvDetailsPageModule {}
