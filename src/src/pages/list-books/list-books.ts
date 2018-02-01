import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, LoadingController, AlertController } from 'ionic-angular';
import { BookApiProvider } from '../../providers/book-api/book-api';
import { Network } from '@ionic-native/network';

/**
 * Generated class for the ListBooksPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-list-books',
  templateUrl: 'list-books.html',
})
export class ListBooksPage {
  listName:any;
  listBooks:any
  constructor(public navCtrl: NavController, public navParams: NavParams,public loadCtrl : LoadingController, 
    public bookApi : BookApiProvider,
    private toastCtrl: ToastController,private network: Network, private alertCtrl: AlertController) {
      this.initialize();
  }


  initialize(){
    this.listName = this.navParams.get("ListName");
    let disconnectSubscription = this.network.onDisconnect().subscribe(() => {
      this.showAlert();
    });
    let loading = this.loadCtrl.create({
      content: 'Retrieving Books list',
    });
    loading.present();
    this.bookApi.getLists(this.listName).subscribe( data => {
      this.listBooks = data;
      console.log(this.listBooks.results);
      loading.dismiss();
    },
    error => {
      loading.dismiss();
      this.presentToast("Hmmm...i couldnt get you what you want! Maybe Later?")
    })
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

  // showDescription(book){
  //   let alert = this.alertCtrl.create({
  //     title: 'Book Description',
  //     subTitle: book.,
  //     buttons: ['OK']
  //   });
  //   alert.present();
  // }


}
