import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, ToastController, AlertController } from 'ionic-angular';
import { ComicsApiProvider } from '../../providers/comics-api/comics-api';
import { Network } from '@ionic-native/network';

/**
 * Generated class for the MarvelFilteredPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-marvel-filtered',
  templateUrl: 'marvel-filtered.html',
})
export class MarvelFilteredPage {
  tabBarElement:any;
  comics:any;
  filterLabel:any;
  dateFilter:any;
  constructor(public navCtrl: NavController, public navParams: NavParams,public loadCtrl : LoadingController, 
    public comicApi : ComicsApiProvider,private toastCtrl: ToastController,private network: Network, private alertCtrl: AlertController) {
    this.tabBarElement = document.querySelector('.tabbar.show-tabbar');
    this.initialize();
  }


  initialize(){
    let disconnectSubscription = this.network.onDisconnect().subscribe(() => {
      this.showAlert();
    });
    this.dateFilter = this.navParams.get("DateFilter")
    this.comicApi.getDateDescriptionMarvelComics().subscribe(data =>{
      this.filterLabel = data
      this.filterLabel.forEach(element => {
        if(element.description === this.dateFilter){
          this.filterLabel = element
        }
      });
    })
    let loading = this.loadCtrl.create({
      content: `Please wait..`,
    });
    loading.present();
    this.comicApi.getMarvelDateRangeComic(this.dateFilter).subscribe( data => {
      this.comics = data
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
