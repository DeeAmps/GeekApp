import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, ToastController, AlertController } from 'ionic-angular';
import { ComicsApiProvider } from '../../providers/comics-api/comics-api';
import { Network } from '@ionic-native/network';
import { XkcdDetailsPage } from '../xkcd-details/xkcd-details';

/**
 * Generated class for the XkcdPageThreePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-xkcd-page-three',
  templateUrl: 'xkcd-page-three.html',
})
export class XkcdPageThreePage {
  comics:any;
  constructor(public navCtrl: NavController, public navParams: NavParams,public loadCtrl : LoadingController, 
    public comicApi : ComicsApiProvider,private toastCtrl: ToastController,private network: Network, private alertCtrl: AlertController) {
      this.initialize();
  }


  initialize(){
    let disconnectSubscription = this.network.onDisconnect().subscribe(() => {
      this.showAlert();
    });
    let loading = this.loadCtrl.create({
      content: 'Retrieving Comics..',
    });
    loading.present();
    this.comicApi.getXKCDOpenComicsPagesThree().subscribe(data => {
      this.comics = data;
      loading.dismiss();
    },error => {
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

  itemSelected(item){
    this.navCtrl.push(XkcdDetailsPage, {"Comic": item})
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
