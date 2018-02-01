import { UpcomingPage } from './../upcoming/upcoming';
import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController  } from 'ionic-angular';
import { NowPlayingPage } from '../now-playing/now-playing';
import { TopRatedPage } from '../top-rated/top-rated';


@IonicPage()
@Component({
  selector: 'page-movies',
  templateUrl: 'movies.html',
})
export class MoviesPage {
  @ViewChild(NowPlayingPage) np: NowPlayingPage;
  tab1Root: any = NowPlayingPage;
  tab2Root: any = UpcomingPage;
  tab3Root: any = TopRatedPage;
  
  constructor(public navCtrl: NavController, public navParams: NavParams, private toastCtrl: ToastController) {
    
  }

  ionViewDidLoad() {
  }


}
