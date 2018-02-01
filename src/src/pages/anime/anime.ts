import { AnimeMainPage } from './../anime-main/anime-main';
import { MangaPage } from './../manga/manga';
import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the AnimePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-anime',
  templateUrl: 'anime.html',
})
export class AnimePage {
  @ViewChild(AnimeMainPage) np: AnimeMainPage;
  tab1Root: any = AnimeMainPage;
  tab2Root: any = MangaPage;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AnimePage');
  }

}
