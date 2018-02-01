import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, ToastController, LoadingController } from 'ionic-angular';
import { ComicsApiProvider } from '../../providers/comics-api/comics-api';
import { Network } from '@ionic-native/network';
import { ComicCharacterDetailsPage } from '../comic-character-details/comic-character-details';

/**
 * Generated class for the ComicPowerDetailsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-comic-power-details',
  templateUrl: 'comic-power-details.html',
})
export class ComicPowerDetailsPage {
  PowerDetailsUrl:any
  PowerCharacters:any;
  tabBarElement:any;

  constructor(public navCtrl: NavController, public navParams: NavParams,public loadCtrl : LoadingController, 
    public comicApi : ComicsApiProvider,private toastCtrl: ToastController,private network: Network, private alertCtrl: AlertController) {
      this.tabBarElement = document.querySelector('.tabbar.show-tabbar');
      this.initialize();
  }

  ionViewWillEnter() {
    this.tabBarElement.style.display = 'none';
  }
 
  ionViewWillLeave() {
    this.tabBarElement.style.display = 'flex';
  }

  initialize(){
    this.PowerDetailsUrl = this.navParams.get("Data")
    let disconnectSubscription = this.network.onDisconnect().subscribe(() => {
      this.showAlert();
    });
    let loading = this.loadCtrl.create({
      content: 'Fetching all Characters..This may take a while',
    });
    loading.present();
    this.comicApi.getCharactersbyPower(this.PowerDetailsUrl.api_detail_url).subscribe( data => {
      this.PowerCharacters = data;
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

  GetCharacterDetails(character){
    this.navCtrl.push(ComicCharacterDetailsPage, {"Data" : character })
  }

  

}
