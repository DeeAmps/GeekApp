import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, ToastController, LoadingController } from 'ionic-angular';
import { Network } from '@ionic-native/network';
import { ComicsApiProvider } from '../../providers/comics-api/comics-api';

/**
 * Generated class for the XkcdDetailsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-xkcd-details',
  templateUrl: 'xkcd-details.html',
})
export class XkcdDetailsPage {
  ComicStrip:any
  tabBarElement:any;
  constructor(public navCtrl: NavController, public navParams: NavParams,public loadCtrl : LoadingController, 
    public comicApi : ComicsApiProvider,private toastCtrl: ToastController,private network: Network, private alertCtrl: AlertController) {
      this.tabBarElement = document.querySelector('.tabbar.show-tabbar');
      this.initialize();
  }

  initialize(){
    let disconnectSubscription = this.network.onDisconnect().subscribe(() => {
      this.showAlert();
    });
    this.ComicStrip = this.navParams.get("Comic");
  }

  ionViewWillEnter() {
    this.tabBarElement.style.display = 'none';
  }
 
  ionViewWillLeave() {
    this.tabBarElement.style.display = 'flex';
  }

  takeMeBack() {
    this.navCtrl.parent.select(0);
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
