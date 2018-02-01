import { SearchTvPage } from './../search-tv/search-tv';
import { PopularTvPage } from './../popular-tv/popular-tv';
import { OnAirPage } from './../on-air/on-air';
import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, AlertController, ToastController } from 'ionic-angular';
import { AiringTodayPage } from '../airing-today/airing-today';
import { Network } from '@ionic-native/network';

/**
 * Generated class for the SeriesPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-series',
  templateUrl: 'series.html',
})
export class SeriesPage {
  @ViewChild(AiringTodayPage) np: AiringTodayPage;
  tab1Root: any = AiringTodayPage;
  tab2Root: any = OnAirPage;
  tab3Root: any = PopularTvPage;

  constructor(public navCtrl: NavController, public navParams: NavParams,
    public loadCtrl : LoadingController,
    private toastCtrl: ToastController,private network: Network, private alertCtrl: AlertController) {
  }

  ionViewDidLoad() {
  }

  searchSeries(){ 
    let alert = this.alertCtrl.create({
      title: 'Search TV Series',
      message: "Enter T.V Series Title",
      inputs: [
        {
          name: 'title',
          placeholder: 'T.V Series'
        },
      ],
      buttons: [
        {
          text: 'Cancel'
        },
        {
          text: 'Search',
          handler: data => {
            console.log(data);
            this.navCtrl.push(SearchTvPage, {"SeriesTitle" : data.title});
          }
        }
      ]
    });
    alert.present();
  }

}
