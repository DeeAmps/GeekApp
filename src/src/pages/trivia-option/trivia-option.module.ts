import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TriviaOptionPage } from './trivia-option';

@NgModule({
  declarations: [
    TriviaOptionPage,
  ],
  imports: [
    IonicPageModule.forChild(TriviaOptionPage),
  ],
})
export class TriviaOptionPageModule {}
