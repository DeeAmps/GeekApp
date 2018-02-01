import { ComingSoonGamesPage } from './../coming-soon-games/coming-soon-games';
import { GamesApiProvider } from './../../providers/games-api/games-api';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, AlertController, ToastController } from 'ionic-angular';
import { Network } from '@ionic-native/network';
import { SearchedGamesPage } from '../searched-games/searched-games';
import { LatestGamesPage } from '../latest-games/latest-games';

/**
 * Generated class for the GamesPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-games',
  templateUrl: 'games.html',
})
export class GamesPage {
  openMenu = false;
  platformList:any;
  constructor(public navCtrl: NavController, public navParams: NavParams,
    public loadCtrl : LoadingController, 
    public gameApi : GamesApiProvider,
    private toastCtrl: ToastController,private network: Network, private alertCtrl: AlertController) {
  }

  ionViewDidLoad() {
    let disconnectSubscription = this.network.onDisconnect().subscribe(() => {
      this.showAlert();
    });
  }

  togglePopupMenu() {
    return this.openMenu = !this.openMenu;
  }

  goToLatestGames(){
    let alert = this.alertCtrl.create();
    alert.setTitle('Select Platform');
    let loading = this.loadCtrl.create({
      content: 'Retrieving Platform list..',
    });
    loading.present();
    this.gameApi.getPlatforms().subscribe(data => {
      this.platformList = data;
      this.platformList.forEach(element => {
        alert.addInput({
          type: 'radio',
          label: element.name,
          value: element.id
        })
      });
      alert.addButton('Cancel');
    alert.addButton({
      text: 'OK',
      handler: data => {
        this.navCtrl.push(LatestGamesPage, {"PlatformId": data});
      }
    });
    loading.dismiss();
    alert.present()
  });
  }

  goToMostAnticipated(){
    this.navCtrl.push(ComingSoonGamesPage);
  }

  goToSearch(){
    let prompt = this.alertCtrl.create({
      title: 'Search Games',
      message: "Enter Title of Game to Search",
      inputs: [
        {
          name: 'title',
          placeholder: 'Game Title'
        },
      ],
      buttons: [
        {
          text: 'Cancel',
          handler: data => {
          }
        },
        {
          text: 'Search',
          handler: data => {
            this.navCtrl.push(SearchedGamesPage, {"Title": data});
          }
        }
      ]
    });
    prompt.present();
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
