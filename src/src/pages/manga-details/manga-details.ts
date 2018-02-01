import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, ToastController, LoadingController, ModalController } from 'ionic-angular';
import { AnimeApiProvider } from '../../providers/anime-api/anime-api';
import { Network } from '@ionic-native/network';
import { AnimeDescriptionModalPage } from '../anime-description-modal/anime-description-modal';

/**
 * Generated class for the MangaDetailsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-manga-details',
  templateUrl: 'manga-details.html',
})
export class MangaDetailsPage {
  SearchResults:any;
  SearchedManga:any;
  constructor(public navCtrl: NavController, public navParams: NavParams,
    public loadCtrl : LoadingController, public animeApi : AnimeApiProvider,
    private toastCtrl: ToastController,private network: Network, private alertCtrl: AlertController,
    public modalCtrl: ModalController) {
      this.initialize()
  }

  ionViewDidLoad() {
  }

  initialize(): any {
      this.SearchedManga = this.navParams.get("Manga");
      let loading = this.loadCtrl.create({
        content: `Fetching Data for ${this.SearchedManga}`
      });
      loading.present();
      this.animeApi.getSearchedManga(this.SearchedManga).subscribe(data => {
        this.SearchResults = data;
        loading.dismiss();
      },
      error => {
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

  showSynopsis(item){
    // let alert = this.alertCtrl.create({
    //   title: `Synopsis - ${item.canonicalTitle}`,
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
}
