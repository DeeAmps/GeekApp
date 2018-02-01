import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SearchTvPage } from './search-tv';

@NgModule({
  declarations: [
    SearchTvPage,
  ],
  imports: [
    IonicPageModule.forChild(SearchTvPage),
  ],
})
export class SearchTvPageModule {}
