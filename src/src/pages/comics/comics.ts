import { XkcdMainPage } from './../xkcd-main/xkcd-main';
import { MarvelMainPage } from './../marvel-main/marvel-main';
import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { OtherComicsMainPage } from '../other-comics-main/other-comics-main';

/**
 * Generated class for the ComicsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-comics',
  templateUrl: 'comics.html',
})
export class ComicsPage {
  @ViewChild(MarvelMainPage) np: MarvelMainPage;
  tab1Root: any = MarvelMainPage;
  tab2Root: any = XkcdMainPage;
  tab3Root: any = OtherComicsMainPage;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
  }

}
