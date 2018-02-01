import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, ModalController, AlertController, LoadingController } from 'ionic-angular';
import { Network } from '@ionic-native/network';
import { GamesApiProvider } from '../../providers/games-api/games-api';

/**
 * Generated class for the LatestGamesPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-latest-games',
  templateUrl: 'latest-games.html',
})
export class LatestGamesPage {
  platformId:any;
  platformName:any;
  latestGames:any;
  platforms:any;
  constructor(public navCtrl: NavController, public navParams: NavParams,public loadCtrl : LoadingController, public gameApi : GamesApiProvider,
    private toastCtrl: ToastController,private network: Network, private alertCtrl: AlertController,
    public modalCtrl: ModalController) {
      this.initialize()
  }

  ionViewDidLoad() {
  }

  initialize(){
    this.platformId = this.navParams.get("PlatformId");
    this.gameApi.getPlatforms().subscribe(data => {
      this.platforms = data;
      this.platforms.forEach(element => {
        if(element["id"] === this.platformId){
          this.platformName = element;
          return;
        }
      });
    })
    let disconnectSubscription = this.network.onDisconnect().subscribe(() => {
      this.showAlert();
    });
    let loading = this.loadCtrl.create({
      content: 'Retrieving latest games'
    });
    loading.present();
    this.gameApi.getLatestGames(this.platformId).subscribe(
      data => {
        this.latestGames = data;
        loading.dismiss();
      },
      error => {
        loading.dismiss();
        this.presentToast("Hmmm...i couldnt get you what you want! Maybe Later?")
      })
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
