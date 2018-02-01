import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';

/**
 * Generated class for the AnimeDescriptionModalPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-anime-description-modal',
  templateUrl: 'anime-description-modal.html',
})
export class AnimeDescriptionModalPage {
  description: any
  constructor(public navCtrl: NavController, public navParams: NavParams, public viewCtrl: ViewController,) {
    this.description = navParams.get('Data');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AnimeDescriptionModalPage');
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }

}
