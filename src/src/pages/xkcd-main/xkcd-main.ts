import { XkcdPageOnePage } from './../xkcd-page-one/xkcd-page-one';
import { ComicsApiProvider } from './../../providers/comics-api/comics-api';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, AlertController, LoadingController } from 'ionic-angular';
import { Network } from '@ionic-native/network';
import { XkcdPageTwoPage } from '../xkcd-page-two/xkcd-page-two';
import { XkcdPageThreePage } from '../xkcd-page-three/xkcd-page-three';
import { XkcdPageFourPage } from '../xkcd-page-four/xkcd-page-four';

/**
 * Generated class for the XkcdMainPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-xkcd-main',
  templateUrl: 'xkcd-main.html',
})
export class XkcdMainPage {
  openMenu = false;
  rdata = true;
  tabBarElement:any;
  todaysComic:any;
  constructor(public navCtrl: NavController, public navParams: NavParams,public loadCtrl : LoadingController, 
    public comicApi : ComicsApiProvider,private toastCtrl: ToastController,private network: Network, private alertCtrl: AlertController) {
      this.initialize();
  }

  Description(text){
    let alert = this.alertCtrl.create({
      title: "Comic Alt",
      subTitle: text,
      buttons: ['OK']
    });
    alert.present();
  }

  initialize() {
    //this.navCtrl.parent.select(1);
    let disconnectSubscription = this.network.onDisconnect().subscribe(() => {
      this.showAlert();
    });
    let loading = this.loadCtrl.create({
      content: 'Retrieving most current xkcd',
    });
    loading.present();
    this.comicApi.getXKCDTodaysComic()
    .subscribe(
      data => {
        this.todaysComic = data;
        this.rdata = false;
        loading.dismiss();
    },
      error => {
        loading.dismiss();
        this.presentToast("Hmmm...i couldnt get you what you want! Maybe Later?")
      }
  );
  }

  goToXKCDPageOne(){
    this.navCtrl.push(XkcdPageOnePage)
  }

  goToXKCDPageTwo(){
    this.navCtrl.push(XkcdPageTwoPage)
  }

  goToXKCDPageThree(){
    this.navCtrl.push(XkcdPageThreePage)
  }

  goToXKCDPageFour(){
    this.navCtrl.push(XkcdPageFourPage)
  }

  togglePopupMenu() {
    return this.openMenu = !this.openMenu;
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
