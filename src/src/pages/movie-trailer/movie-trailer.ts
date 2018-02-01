import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, AlertController } from 'ionic-angular';
import { DomSanitizer } from '@angular/platform-browser';
import { Network } from '@ionic-native/network';
/**
 * Generated class for the MovieTrailerPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-movie-trailer',
  templateUrl: 'movie-trailer.html',
})
export class MovieTrailerPage {
  trailerUrl:string;
  movieTitle:string;
  constructor(public navCtrl: NavController, public navParams: NavParams, private dom: DomSanitizer,
    public loadCtrl : LoadingController, private network: Network, private alertCtrl: AlertController) {
    this.trailerUrl = this.navParams.get("Trailer");
    this.movieTitle = this.navParams.get("Title");
  }

  ionViewDidLoad() {
    let disconnectSubscription = this.network.onDisconnect().subscribe(() => {
      this.showAlert();
    });
    
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

  sanitize(vid){
    return this.dom.bypassSecurityTrustResourceUrl(vid);
  }

}
