import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, ToastController, AlertController } from 'ionic-angular';
import { MoviesApiProvider } from '../../providers/movies-api/movies-api';
import { Network } from '@ionic-native/network';

/**
 * Generated class for the TopRatedPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-top-rated',
  templateUrl: 'top-rated.html',
})
export class TopRatedPage {
  topRated:any;
  constructor(public navCtrl: NavController, public navParams: NavParams,
    public loadCtrl : LoadingController, public movieApi : MoviesApiProvider,
    private toastCtrl: ToastController, private network: Network, private alertCtrl: AlertController) {
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

  ionViewDidLoad() {
    let disconnectSubscription = this.network.onDisconnect().subscribe(() => {
      this.showAlert();
    });

    let loading = this.loadCtrl.create({
      content: 'Retrieving Top Rated movie list..'
    });
  
    loading.present();
    this.movieApi.getTopRatedMovies()
    .subscribe(
      data => {
        this.topRated = data;
        loading.dismiss();
    },
      error => {
        loading.dismiss();
        this.presentToast("Hmmm...i couldnt get you what you want! Maybe Later?")
      }
  );
  }

  doRefresh(refresher){
    setTimeout(() => {
      refresher.complete();
    }, 2000);
   this.ionViewDidLoad();
  }

  presentToast(message, duration = 5000) {
    let toast = this.toastCtrl.create({
      message: message,
      duration: duration,
      position: 'button'
    });
    toast.present();
  }


}
