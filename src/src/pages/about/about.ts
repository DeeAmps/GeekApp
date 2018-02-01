import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';

/**
 * Generated class for the AboutPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-about',
  templateUrl: 'about.html',
})
export class AboutPage {

  constructor(public navCtrl: NavController, public navParams: NavParams,public alertCtrl: AlertController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AboutPage');
  }

  showAPI(){
    let alert = this.alertCtrl.create({
      title: 'Acknowledgement',
      subTitle: `
      <p>Geek Up was made possible through the following:</p>
      <ul>
      <li>Kitsu API</li>
      <li>The NY Times API</li>
      <li>XKCD API</li>
      <li>Marvel API</li>
      <li>Comic Vine API</li>
      <li>Giant Bomb API</li>
      <li>Hacker News API</li>
      <li>The MovieDB API</li>
      <li>Qriusity API</li>
      <li>Open TDB API</li>
      </ul>`,
      buttons: ['OK']
    });
    alert.present();
  }

}
