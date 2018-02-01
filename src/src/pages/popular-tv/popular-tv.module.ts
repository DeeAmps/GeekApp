import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PopularTvPage } from './popular-tv';

@NgModule({
  declarations: [
    PopularTvPage,
  ],
  imports: [
    IonicPageModule.forChild(PopularTvPage),
  ],
})
export class PopularTvPageModule {}
