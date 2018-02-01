import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, ToastController, AlertController, LoadingController } from 'ionic-angular';
import { Network } from '@ionic-native/network';
import { GamesApiProvider } from '../../providers/games-api/games-api';

/**
 * Generated class for the SearchedGamesPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-searched-games',
  templateUrl: 'searched-games.html',
})
export class SearchedGamesPage {
  searchString:string = '';
  searchedResults:any;
  constructor(public navCtrl: NavController, public navParams: NavParams,public loadCtrl : LoadingController, public gameApi : GamesApiProvider,
    private toastCtrl: ToastController,private network: Network, private alertCtrl: AlertController,
    public modalCtrl: ModalController) {
      this.initialize()
  }


  initialize(){
    this.searchString = this.navParams.get("Title").title;
    let disconnectSubscription = this.network.onDisconnect().subscribe(() => {
      this.showAlert();
    });
    let loading = this.loadCtrl.create({
      content: `Retrieving Results for ${this.searchString}..`
    });
    loading.present();
    this.gameApi.searchGames(this.searchString).subscribe(
      data => {
        this.searchedResults = data;
        console.log(this.searchedResults);
        loading.dismiss();
      },error => {
        loading.dismiss();
        this.presentToast("Hmmm...i couldnt get you what you want! Maybe Later?")
      }
    )
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
