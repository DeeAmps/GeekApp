import { ComicPowerDetailsPage } from './../comic-power-details/comic-power-details';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, LoadingController, AlertController } from 'ionic-angular';
import { ComicsApiProvider } from '../../providers/comics-api/comics-api';
import { Network } from '@ionic-native/network';
import { ComicCharacterSearchPage } from '../comic-character-search/comic-character-search';

/**
 * Generated class for the OtherComicsMainPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-other-comics-main',
  templateUrl: 'other-comics-main.html',
})
export class OtherComicsMainPage {
  comicPowers:any;
  limitNumber:number;
  comicResults: Array<any> = [];
  totalResults:number = 128;
  offset:number = -30;
  constructor(public navCtrl: NavController, public navParams: NavParams,public loadCtrl : LoadingController, 
    public comicApi : ComicsApiProvider,private toastCtrl: ToastController,private network: Network, private alertCtrl: AlertController) {
      this.intialize();
  }

  ionViewDidLoad() {
  }

  intialize(){
    let disconnectSubscription = this.network.onDisconnect().subscribe(() => {
      this.showAlert();
    });
    let loading = this.loadCtrl.create({
      content: 'Please wait..',
    });
    loading.present();
    this.load();
    loading.dismiss();
  }

  Details(power){
    this.navCtrl.push(ComicPowerDetailsPage, {"Data" : power })
  }

  handleSearch(){
    let alert = this.alertCtrl.create({
      title: 'Search Comic Character',
      message: "Enter Name of Character",
      inputs: [
        {
          name: 'name',
          placeholder: 'Comic Character'
        },
      ],
      buttons: [
        {
          text: 'Cancel'
        },
        {
          text: 'Search',
          handler: data => {
            this.navCtrl.push(ComicCharacterSearchPage, {"Name" : data.name});
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
            this.intialize()
          }
        },
      ]
    });
    alert.present();
  }

  load() {
    return new Promise( resolve => {
    this.limitNumber += 30;
    this.offset += 30;
    console.log(this.offset);
      this.comicApi.getComicBookPowers(this.offset)
         .subscribe( data => {
          this.comicPowers = data;
          //   for(let i=0; i < this.comicPowers.results.length; i++) {
          //     this.comicResults.push(this.comicPowers.results[i]);
          //   }
          //   console.log(this.comicResults)
          for(let power of this.comicPowers.results) {
            this.comicResults.push(power);
          }
            resolve(true);
           },
           error => {
            this.presentToast("Hmmm...i couldnt get you what you want! Maybe Later?")
          });
    });
  }
  

  doInfinite(infiniteScroll:any) {
    this.load().then(()=>{
      infiniteScroll.complete();
    });
    
 }

}
