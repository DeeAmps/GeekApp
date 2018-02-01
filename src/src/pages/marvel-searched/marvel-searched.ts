import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, LoadingController, AlertController } from 'ionic-angular';
import { ComicsApiProvider } from '../../providers/comics-api/comics-api';
import { Network } from '@ionic-native/network';
import { InAppBrowser } from '@ionic-native/in-app-browser';

/**
 * Generated class for the MarvelSearchedPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-marvel-searched',
  templateUrl: 'marvel-searched.html',
})
export class MarvelSearchedPage {
  tabBarElement:any;
  searchString:any;
  searchCharacters:any;
  constructor(public navCtrl: NavController, public navParams: NavParams,public loadCtrl : LoadingController, 
    public comicApi : ComicsApiProvider,private iab: InAppBrowser,private toastCtrl: ToastController,private network: Network, private alertCtrl: AlertController) {
    this.tabBarElement = document.querySelector('.tabbar.show-tabbar');
    this.initialize();
  }


  initialize(){
    let disconnectSubscription = this.network.onDisconnect().subscribe(() => {
      this.showAlert();
    });
    let loading = this.loadCtrl.create({
      content: 'Retrieving Characters...',
    });
    loading.present();
    this.searchString = this.navParams.get("SearchString");
    this.comicApi.getMarvelSearchedCharacter(this.searchString).subscribe(data => {
      this.searchCharacters = data;
      loading.dismiss();
    },
    error => {
      loading.dismiss();
      this.presentToast("Hmmm...i couldnt get you what you want! Maybe Later?")
    })
  }

  ionViewWillEnter() {
    this.tabBarElement.style.display = 'none';
  }
 
  ionViewWillLeave() {
    this.tabBarElement.style.display = 'flex';
  }

  OpenLink(url){
    const browser = this.iab.create(url,'_self',{location:'no'}); 
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
