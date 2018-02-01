import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MovieTrailerPage } from './movie-trailer';

@NgModule({
  declarations: [
    MovieTrailerPage,
  ],
  imports: [
    IonicPageModule.forChild(MovieTrailerPage),
  ],
})
export class MovieTrailerPageModule {}
