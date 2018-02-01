import { SettingsPage } from './../pages/settings/settings';
import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { MoviesPage } from '../pages/movies/movies';
import { AnimePage } from '../pages/anime/anime';
import { SeriesPage } from '../pages/series/series';
import { GamesPage } from './../pages/games/games';
import { AboutPage } from './../pages/about/about';
import { BooksPage } from '../pages/books/books';
import { ComicsPage } from '../pages/comics/comics';
import { NewsPage } from '../pages/news/news';
import { PokemonPage } from '../pages/pokemon/pokemon';
import { TriviaPage } from '../pages/trivia/trivia';


@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = MoviesPage;

  pages: Array<{title: string, component: any, icon: string}>;
  lastPage: Array<{title: string, component: any, icon: string}>;

  constructor(public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen) {
    this.initializeApp();

    // used for an example of ngFor and navigation
    this.pages = [
      { title: 'Anime', component: AnimePage, icon : "ionitron" },
      { title: 'Books', component: BooksPage, icon : "book" },
      { title: 'Comics', component: ComicsPage, icon : "chatboxes" },
      { title: 'Games', component: GamesPage, icon : "game-controller-b" },
      { title: 'Movies', component: MoviesPage, icon : "videocam" },
      { title: 'Hacker News', component: NewsPage, icon : "logo-hackernews" },
      { title: 'Pokemon', component: PokemonPage, icon : "bug" },
      { title: 'T.V Series', component: SeriesPage, icon : "film" },
      { title: 'Trivia', component: TriviaPage, icon : "checkbox" },
    ];

    this.lastPage = [{ title: 'About', component: AboutPage, icon : "alert" }
    // { title: 'Settings', component: SettingsPage, icon : "settings" }
  ];

  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.splashScreen.hide();
    });
  }

  // hideSplashScreen() {
  //   if (this.splashScreen) {
  //     setTimeout(() => {
  //       this.splashScreen.hide();
  //     }, 100);
  //    }
  // }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }
}
