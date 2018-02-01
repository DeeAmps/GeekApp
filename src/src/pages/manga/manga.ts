import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, ToastController, AlertController, ModalController } from 'ionic-angular';
import { Network } from '@ionic-native/network';
import { AnimeApiProvider } from '../../providers/anime-api/anime-api';
import { FormControl, Validators } from '@angular/forms';
import { MangaDetailsPage } from '../manga-details/manga-details';
import { AnimeDescriptionModalPage } from '../anime-description-modal/anime-description-modal';

/**
 * Generated class for the MangaPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-manga',
  templateUrl: 'manga.html',
})
export class MangaPage {
  trendingManga:any;
  manga = new FormControl('', [Validators.required, Validators.minLength(3)]);
  constructor(public navCtrl: NavController, public navParams: NavParams, public loadCtrl : LoadingController, public animeApi : AnimeApiProvider,
    private toastCtrl: ToastController,private network: Network, private alertCtrl: AlertController,
    public modalCtrl: ModalController) {
  }

  ionViewDidLoad() {
    let disconnectSubscription = this.network.onDisconnect().subscribe(() => {
      this.showAlert();
    });
    let loading = this.loadCtrl.create({
      content: 'Retrieving Trending Manga..'
    });
    loading.present();
    this.animeApi.getTrendingManga().subscribe( data =>{
      this.trendingManga = data;
      loading.dismiss();
      this.presentToast("Select Card for description", 3000)
    },
    error => {
      loading.dismiss();
      this.presentToast("Hmmm...i couldnt get you what you want! Maybe Later?")
    });
  }

  handleSearch(){
    let alert = this.alertCtrl.create({
      title: 'Search Manga',
      message: "Enter Title of Manga",
      inputs: [
        {
          name: 'title',
          placeholder: 'Manga Title'
        },
      ],
      buttons: [
        {
          text: 'Cancel'
        },
        {
          text: 'Search',
          handler: data => {
            this.navCtrl.push(MangaDetailsPage, {"Manga" : data.title});
          }
        }
      ]
    });
    alert.present();
  }

  doRefresh(refresher){
    setTimeout(() => {
      refresher.complete();
    }, 2000);
   this.ionViewDidLoad();
  }

  showSynopsis(item){
    // let alert = this.alertCtrl.create({
    //   title: `Synopsis - ${item.canonicalTitle}Synopsis`,
    //   subTitle: item.synopsis,
    //   cssClass: 'customAlert',
    //   buttons: ['Done']
    // });
    // alert.present();
    this.openModal(AnimeDescriptionModalPage, item);
  }
  
  openModal(pagename, data) {
    this.modalCtrl.create(pagename, { "Data" : data}, { cssClass: 'inset-modal' })
                  .present();
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

