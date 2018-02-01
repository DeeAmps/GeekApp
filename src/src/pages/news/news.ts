import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, AlertController, ToastController } from 'ionic-angular';
import { HackerNewsApiProvider } from '../../providers/hacker-news-api/hacker-news-api';
import { Network } from '@ionic-native/network';
import { InAppBrowser } from '@ionic-native/in-app-browser';

/**
 * Generated class for the NewsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-news',
  templateUrl: 'news.html',
})
export class NewsPage {
  topStories:any;
  organisedTops:Array<any> = [];
  constructor(public navCtrl: NavController, public navParams: NavParams,public loadCtrl : LoadingController, 
    public newsApi : HackerNewsApiProvider,private iab: InAppBrowser,
    private toastCtrl: ToastController,private network: Network, private alertCtrl: AlertController) {
  }

  ionViewDidLoad() {
    let disconnectSubscription = this.network.onDisconnect().subscribe(() => {
      this.showAlert();
    });
    let loading = this.loadCtrl.create({
      content: 'Loading Top Stories...',
    });
    loading.present();
    this.newsApi.getTopStories().subscribe(data => {
      this.topStories = data;
      for (let index = 0; index < 20; index++) {
        this.newsApi.getOrganisedTopStories(this.topStories[index]).subscribe(
          data => {
            this.organisedTops.push(data);
          }
        )
      }
      loading.dismiss();
    })
  }

  Readstory(url){
    const browser = this.iab.create(url,'_self',{location:'no', closebuttoncaption:'Close'}); 
  }

  GetTime(time){
    var d = new Date(time * 1000);
    return d.toLocaleDateString();
  }

  showAlert(){
    let alert = this.alertCtrl.create({
      title: "Connection Lost",
      subTitle: 'Oh Internet, Where art thou? :(',
      buttons: [
        {
          text: 'Try Again',
          handler: data => {
            this.ionViewDidLoad()
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

}
