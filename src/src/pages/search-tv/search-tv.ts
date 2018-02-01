import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, ToastController, AlertController } from 'ionic-angular';
import { Network } from '@ionic-native/network';
import { TvApiProvider } from '../../providers/tv-api/tv-api';
import { TvDetailsPage } from '../tv-details/tv-details';

/**
 * Generated class for the SearchTvPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-search-tv',
  templateUrl: 'search-tv.html',
})
export class SearchTvPage {
  tabBarElement:any;
  SearchResults:any;
  tvtitle:any;
  constructor(public navCtrl: NavController, public navParams: NavParams,
    public loadCtrl : LoadingController, public tvApi : TvApiProvider,
    private toastCtrl: ToastController,private network: Network, private alertCtrl: AlertController) {
      this.tabBarElement = document.querySelector('.tabbar.show-tabbar');
      this.initialize();
  }

  initialize() {
    this.tvtitle = this.navParams.get("SeriesTitle");
    let disconnectSubscription = this.network.onDisconnect().subscribe(() => {
      this.showAlert();
    });

    let loading = this.loadCtrl.create({
      content: 'Retrieving search results...'
    });
    this.tvApi.searchTVSeries(this.tvtitle).subscribe(
      data => {
        this.SearchResults = data;
        loading.dismiss();
        this.presentToast("Select a Card for Details", 3000);
      },
      error => {
        loading.dismiss();
        this.presentToast("Hmmm...i couldnt get you what you want! Maybe Later?")
      }
    )
    
  }

  GetSeriesDetails(id){
    this.navCtrl.push(TvDetailsPage, {"TVid": id} )
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
