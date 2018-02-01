import { AnimeDescriptionModalPage } from './../anime-description-modal/anime-description-modal';
import { AnimeDetailsPage } from './../anime-details/anime-details';
import { AnimeApiProvider } from './../../providers/anime-api/anime-api';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, ToastController, AlertController, ModalController } from 'ionic-angular';
import { FormControl, Validators } from '@angular/forms';
import { Network } from '@ionic-native/network';


/**
 * Generated class for the AnimeMainPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-anime-main',
  templateUrl: 'anime-main.html',
})
export class AnimeMainPage {
  trendingAnime: any;
  searchAnime:string;
  anime = new FormControl('', [Validators.required, Validators.minLength(3)]);
  constructor(public navCtrl: NavController, public navParams: NavParams,
    public loadCtrl : LoadingController, public animeApi : AnimeApiProvider,
    private toastCtrl: ToastController,private network: Network, private alertCtrl: AlertController,
    public modalCtrl: ModalController) {
      
  }

  ionViewDidLoad() {
    this.searchAnime = ' ';
    let disconnectSubscription = this.network.onDisconnect().subscribe(() => {
      this.showAlert();
    });
    let loading = this.loadCtrl.create({
      content: 'Retrieving Trending Anime..'
    });
    loading.present();
    this.animeApi.getTrendingAnime().subscribe( data =>{
      this.trendingAnime = data;
      loading.dismiss();
      this.presentToast("Select Card for description", 3000)
    },
    error => {
      loading.dismiss();
      this.presentToast("Hmmm...i couldnt get you what you want! Maybe Later?")
    });
  }

  doRefresh(refresher){
    setTimeout(() => {
      refresher.complete();
    }, 2000);
   this.ionViewDidLoad();
  }

  showSynopsis(item){
    this.openModal(AnimeDescriptionModalPage, item);
  }

  openModal(pagename, data) {
    this.modalCtrl.create(pagename, { "Data" : data}, { cssClass: 'inset-modal' })
                  .present();
  }

  handleSearch(){
    let alert = this.alertCtrl.create({
      title: 'Search Anime',
      message: "Enter Title of Anime",
      inputs: [
        {
          name: 'title',
          placeholder: 'Anime Title'
        },
      ],
      buttons: [
        {
          text: 'Cancel'
        },
        {
          text: 'Search',
          handler: data => {
            console.log(data);
            this.navCtrl.push(AnimeDetailsPage, {"Anime" : data.title});
          }
        }
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


}
