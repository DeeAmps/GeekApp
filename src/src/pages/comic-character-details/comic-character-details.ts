import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, LoadingController, ToastController } from 'ionic-angular';
import { ComicsApiProvider } from '../../providers/comics-api/comics-api';
import { Network } from '@ionic-native/network';

/**
 * Generated class for the ComicCharacterDetailsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-comic-character-details',
  templateUrl: 'comic-character-details.html',
})
export class ComicCharacterDetailsPage {
  tabBarElement:any;
  CharacterDetailsUrl:any;
  charactersDetails:any;
  constructor(public navCtrl: NavController, public navParams: NavParams, public loadCtrl : LoadingController, 
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
    this.CharacterDetailsUrl = this.navParams.get("Data")
    let disconnectSubscription = this.network.onDisconnect().subscribe(() => {
      this.showAlert();
    });
    let loading = this.loadCtrl.create({
      content: 'Please wait..',
    });
    loading.present();
    this.comicApi.getCharactersDetails(this.CharacterDetailsUrl.api_detail_url).subscribe( data => {
      this.charactersDetails = data;
      loading.dismiss();
    },error => {
      loading.dismiss();
      this.presentToast("Hmmm...i couldnt get you what you want! Maybe Later?")
    });
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
