import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, ToastController, LoadingController } from 'ionic-angular';
import { TvApiProvider } from '../../providers/tv-api/tv-api';
import { Network } from '@ionic-native/network';

/**
 * Generated class for the TvDetailsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-tv-details',
  templateUrl: 'tv-details.html',
})
export class TvDetailsPage {
  tabBarElement:any;
  tvDetails:Array<any> = [];
  tvId:number;
  constructor(public navCtrl: NavController, public navParams: NavParams,
    public loadCtrl : LoadingController, public tvApi : TvApiProvider,
    private toastCtrl: ToastController,private network: Network, private alertCtrl: AlertController) {
      this.tabBarElement = document.querySelector('.tabbar.show-tabbar');
      this.initialize();
  }


  initialize(){
    let disconnectSubscription = this.network.onDisconnect().subscribe(() => {
      this.showAlert();
    });

    let loading = this.loadCtrl.create({
      content: 'Retrieving Series Details'
    });
    this.tvId = this.navParams.get("TVid");
    this.tvApi.getTVDetails(this.tvId).subscribe(
      data => {
        this.tvDetails.push(data);
        loading.dismiss();
      },
      error => {
        loading.dismiss();
        this.presentToast("Hmmm...i couldnt get you what you want! Maybe Later?")
      }
    )
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


  presentToast(message, duration = 5000) {
    let toast = this.toastCtrl.create({
      message: message,
      duration: duration,
      position: 'button'
    });
    toast.present();
  }

  ionViewWillEnter() {
    this.tabBarElement.style.display = 'none';
  }
 
  ionViewWillLeave() {
    this.tabBarElement.style.display = 'flex';
  }

}
