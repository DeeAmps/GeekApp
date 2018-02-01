import { GameTrailerPage } from './../game-trailer/game-trailer';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, ModalController, AlertController, LoadingController } from 'ionic-angular';
import { Network } from '@ionic-native/network';
import { GamesApiProvider } from '../../providers/games-api/games-api';

/**
 * Generated class for the ComingSoonGamesPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-coming-soon-games',
  templateUrl: 'coming-soon-games.html',
})
export class ComingSoonGamesPage {
  platformId:any;
  platformName:any;
  aniticipatedGames:any;
  constructor(public navCtrl: NavController, public navParams: NavParams,public loadCtrl : LoadingController, public gameApi : GamesApiProvider,
    private toastCtrl: ToastController,private network: Network, private alertCtrl: AlertController,
    public modalCtrl: ModalController) {
      this.initialize();
  }


  initialize(){
    let disconnectSubscription = this.network.onDisconnect().subscribe(() => {
      this.showAlert();
    });
    let loading = this.loadCtrl.create({
      content: 'Retrieving Most Anticipated(2018)..'
    });
    loading.present();
    this.gameApi.get2018UpcomingGames().subscribe(data =>{
      this.aniticipatedGames = data;
      loading.dismiss();
    }) 
  }

  watchTrailer(trailer, gameTitle){
    this.navCtrl.push(GameTrailerPage, {"Trailer" : trailer, "GameTitle":gameTitle})
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
            this.initialize()
          }
        },
      ]
    });
    alert.present();
  }

}
