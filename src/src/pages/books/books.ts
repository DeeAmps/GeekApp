import { BookDetailsPage } from './../book-details/book-details';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, AlertController, LoadingController } from 'ionic-angular';
import { BookApiProvider } from '../../providers/book-api/book-api';
import { Network } from '@ionic-native/network';
import { ListBooksPage } from '../list-books/list-books';
/**
 * Generated class for the BooksPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-books',
  templateUrl: 'books.html',
})
export class BooksPage {
  bestSellerOverview:any;
  listNames:any;
  constructor(public navCtrl: NavController, public navParams: NavParams,public loadCtrl : LoadingController, 
    public bookApi : BookApiProvider,
    private toastCtrl: ToastController,private network: Network, private alertCtrl: AlertController) {
  }

  ionViewDidLoad() {
    let disconnectSubscription = this.network.onDisconnect().subscribe(() => {
      this.showAlert();
    });
    let loading = this.loadCtrl.create({
      content: 'Retrieving Best Sellers..',
    });
    loading.present();
    this.bookApi.getOverview().subscribe( data => {
      this.bestSellerOverview = data;
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

  showListNames(){
    let alert = this.alertCtrl.create();
    alert.setTitle('Select List Type');
    let loading = this.loadCtrl.create({
      content: 'Retrieving list Names..',
    });
    loading.present();
    this.bookApi.getListNames().subscribe( data => {
      this.listNames = data
      this.listNames.results.forEach(element => {
        alert.addInput({
          type: 'radio',
          label: element.display_name,
          value: element.list_name_encoded
        })
      });
      alert.addButton('Cancel');
    alert.addButton({
      text: 'OK',
      handler: data => {
        this.navCtrl.push(ListBooksPage, { "ListName" : data })
      }
    });
    loading.dismiss();
    alert.present();
    })
  }

  BookDetails(book){
    this.navCtrl.push(BookDetailsPage, {"BookDetails" : book} )
  }


}
