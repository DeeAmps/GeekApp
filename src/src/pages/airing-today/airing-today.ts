import { TvApiProvider } from './../../providers/tv-api/tv-api';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, ModalController, ToastController, AlertController } from 'ionic-angular';
import { Network } from '@ionic-native/network';
import { TvDetailsPage } from '../tv-details/tv-details';
import { SearchTvPage } from '../search-tv/search-tv';

/**
 * Generated class for the AiringTodayPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-airing-today',
  templateUrl: 'airing-today.html',
})
export class AiringTodayPage {
  AiringToday:any;
  constructor(public navCtrl: NavController, public navParams: NavParams,
    public loadCtrl : LoadingController, public tvApi : TvApiProvider,
    private toastCtrl: ToastController,private network: Network, private alertCtrl: AlertController) {
  }

  ionViewDidLoad() {
    let disconnectSubscription = this.network.onDisconnect().subscribe(() => {
      this.showAlert();
    });
    let loading = this.loadCtrl.create({
      content: 'Retrieving Series Airing today..'
    });
    loading.present();
    this.tvApi.getShowsAiringToday().subscribe(
      data => {
        this.AiringToday = data;
        loading.dismiss();
        this.presentToast("Select a Card for Details", 2000);
      },
      error => {
        loading.dismiss();
        this.presentToast("Hmmm...i couldnt get you what you want! Maybe Later?")
      }
    )
  }

  SearchSeries(){
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
            this.navCtrl.push(SearchTvPage, {"SeriesTitle" : data.title});
          }
        }
      ]
    });
    alert.present();
  }

  doRefresh(refresher){
    setTimeout(() => {
      refresher.complete();
    }, 2000);
   this.ionViewDidLoad();
  };

  GetSeriesDetails(id){
    this.navCtrl.push(TvDetailsPage, {"TVid": id} )
  }

  presentToast(message, duration = 5000) {
    let toast = this.toastCtrl.create({
      message: message,
      duration: duration,
      position: 'button'
    });
    toast.present();
  }

  showAlert(){
    let alert = this.alertCtrl.create({
      title: "Connection Lost",
      subTitle: 'Oh Internet, Where art thou? :(',
      buttons: [
        {
          text: 'Try Again',
          handler: data => {
            this.ionViewDidLoad()
          }
        },
      ]
    });
    alert.present();
  }

}
