import { MoviesPage } from './../movies/movies';
import { SettingsApiProvider } from './../../providers/settings-api/settings-api';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, ToastController, AlertController } from 'ionic-angular';
import { Network } from '@ionic-native/network';
import { Storage } from '@ionic/storage';

/**
 * Generated class for the SettingsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-settings',
  templateUrl: 'settings.html',
})
export class SettingsPage {

  constructor(public navCtrl: NavController, public navParams: NavParams, public loadCtrl : LoadingController, 
    public settingsApi : SettingsApiProvider,public storage: Storage,
    private toastCtrl: ToastController,private network: Network, private alertCtrl: AlertController) {
      // this.defaultpage = this.storage.get("DefaultPage").then(data => {
      //   this.defaultpage = data.name ? data.name : "Movies"
      // });
      
  }

  ionViewDidLoad() {
    
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
      buttons: ['OK']
    });
    alert.present();
  }

}
