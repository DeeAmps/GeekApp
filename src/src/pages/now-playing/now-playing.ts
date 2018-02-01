import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, ToastController, AlertController  } from 'ionic-angular';
import { MoviesApiProvider } from '../../providers/movies-api/movies-api';
import { Network } from '@ionic-native/network';
import { AlertInputOptions } from 'ionic-angular/components/alert/alert-options';



@IonicPage()
@Component({
  selector: 'page-now-playing',
  templateUrl: 'now-playing.html',
})
export class NowPlayingPage {
  nowPlaying: any;  
  constructor(public navCtrl: NavController, 
    public navParams: NavParams, 
    public loadCtrl : LoadingController, public movieApi : MoviesApiProvider,
    private toastCtrl: ToastController, private network: Network, private alertCtrl: AlertController) 
    {
  }

  ionViewDidLoad() {
    let disconnectSubscription = this.network.onDisconnect().subscribe(() => {
      this.showAlert();
    });

    let loading = this.loadCtrl.create({
      content: 'Retrieving Movies In Cinemas'
    });
  
    loading.present();
    this.movieApi.getNowPlayingMovies()
    .subscribe(
      data => {
        this.nowPlaying = data;
        loading.dismiss();
    },
      error => {
        loading.dismiss();
        this.presentToast("Hmmm...i couldnt get you what you want! Maybe Later?")
      }
  );
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
