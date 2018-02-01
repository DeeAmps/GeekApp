import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ComicPowerDetailsPage } from './comic-power-details';

@NgModule({
  declarations: [
    ComicPowerDetailsPage,
  ],
  imports: [
    IonicPageModule.forChild(ComicPowerDetailsPage),
  ],
})
export class ComicPowerDetailsPageModule {}
