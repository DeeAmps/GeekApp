import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AiringTodayPage } from './airing-today';

@NgModule({
  declarations: [
    AiringTodayPage,
  ],
  imports: [
    IonicPageModule.forChild(AiringTodayPage),
  ],
})
export class AiringTodayPageModule {}
