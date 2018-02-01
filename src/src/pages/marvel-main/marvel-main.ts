import { XkcdMainPage } from './../xkcd-main/xkcd-main';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, ToastController, LoadingController } from 'ionic-angular';
import { ComicsApiProvider } from '../../providers/comics-api/comics-api';
import { Network } from '@ionic-native/network';
import { MarvelFilteredPage } from '../marvel-filtered/marvel-filtered';
import { MarvelSearchedPage } from '../marvel-searched/marvel-searched';

/**
 * Generated class for the MarvelMainPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-marvel-main',
  templateUrl: 'marvel-main.html',
})
export class MarvelMainPage {
  filterList:any;
  dateValue:any;
  comics:any
  constructor(public navCtrl: NavController, public navParams: NavParams, public loadCtrl : LoadingController, 
    public comicApi : ComicsApiProvider,private toastCtrl: ToastController,private network: Network, private alertCtrl: AlertController) {
      
  }

  // ionViewDidLoad() {
  //   console.log('ionViewDidLoad MarvelMainPage');
  // }

  ionViewDidEnter(){
    this.initialize();
  }

  initialize(){
    let disconnectSubscription = this.network.onDisconnect().subscribe(() => {
      this.showAlert();
    });

    let loading = this.loadCtrl.create({
      content: 'Retrieving this weeks Marvel Comics',
    });
    loading.present();
    this.comicApi.getMarvelDateRangeComic("thisWeek").subscribe( data => {
      this.comics = data
      loading.dismiss();
    },
    error => {
      loading.dismiss();
      this.presentToast("Hmmm...i couldnt get you what you want! Maybe Later?")
    })
  }

  FilterComic(){
    let alert = this.alertCtrl.create();
    alert.setTitle('Select Filter Range');
    let loading = this.loadCtrl.create({
      content: 'Retrieving Comic filters..',
    });
    loading.present();
    this.comicApi.getDateDescriptionMarvelComics()
    .subscribe(
      data => {
        this.filterList = data;
        this.filterList.forEach(element => {
          if(element.description === "thisWeek"){
            alert.addInput({
              type: 'radio',
              label: element.actual,
              value: element.description,
              checked: true
            })
          }
          else{
            alert.addInput({
              type: 'radio',
              label: element.actual,
              value: element.description
            })
          }
          
        });
        alert.addButton({
          text: 'Cancel'
        });
        alert.addButton({
          text: 'OK',
          handler: data => {
            console.log(data);
            this.navCtrl.push(MarvelFilteredPage, {"DateFilter": data})
          }
        });
        loading.dismiss();
        alert.present();
      },
      error => {
        loading.dismiss();
        this.presentToast("Hmmm...i couldnt get you what you want! Maybe Later?")
      })
  }

  SearchComic(){
    let prompt = this.alertCtrl.create({
      title: 'Search Marvel Characters',
      message: "Enter Name of Marvel Character",
      inputs: [
        {
          name: 'name',
          placeholder: 'Marvel Character'
        },
      ],
      buttons: [
        {
          text: 'Cancel',
          handler: data => {
          }
        },
        {
          text: 'Search',
          handler: data => {
            this.navCtrl.push(MarvelSearchedPage, {"SearchString" : data.name})
          }
        }
      ]
    });
    prompt.present();
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
