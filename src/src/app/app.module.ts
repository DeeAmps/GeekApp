import { AboutPageModule } from './../pages/about/about.module';
import { TvDetailsPage } from './../pages/tv-details/tv-details';
import { OnAirPage } from './../pages/on-air/on-air';
import { SettingsPage } from './../pages/settings/settings';
import { ComicPowerDetailsPage } from './../pages/comic-power-details/comic-power-details';
import { MarvelSearchedPage } from './../pages/marvel-searched/marvel-searched';
import { XkcdDetailsPage } from './../pages/xkcd-details/xkcd-details';
import { XkcdPageTwoPage } from './../pages/xkcd-page-two/xkcd-page-two';
import { XkcdPageFourPage } from './../pages/xkcd-page-four/xkcd-page-four';
import { XkcdPageOnePage } from './../pages/xkcd-page-one/xkcd-page-one';
import { MarvelMainPage } from './../pages/marvel-main/marvel-main';
import { GameTrailerPage } from './../pages/game-trailer/game-trailer';
import { SearchedGamesPage } from './../pages/searched-games/searched-games';
import { ComingSoonGamesPage } from './../pages/coming-soon-games/coming-soon-games';
import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { HttpClientModule } from '@angular/common/http';
import { Network } from '@ionic-native/network';


import { MyApp } from './app.component';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';


import { MoviesPage } from '../pages/movies/movies';
import { AnimePage } from '../pages/anime/anime';
import { SeriesPage } from '../pages/series/series';
import { GamesPage } from './../pages/games/games';
// import { AboutPage } from './../pages/about/about';
import { BooksPage } from '../pages/books/books';
import { ComicsPage } from '../pages/comics/comics';
import { NewsPage } from '../pages/news/news';
import { PokemonPage } from '../pages/pokemon/pokemon';
import { TriviaPage } from '../pages/trivia/trivia';
import { MoviesApiProvider } from '../providers/movies-api/movies-api';
import { TopRatedPage } from '../pages/top-rated/top-rated';
import { PokemonApiProvider } from '../providers/pokemon-api/pokemon-api';
import { PokemonDetailsPage } from '../pages/pokemon-details/pokemon-details';
import { AnimeApiProvider } from '../providers/anime-api/anime-api';
import { AnimeDetailsPage } from '../pages/anime-details/anime-details';
import { MovieTrailerPage } from '../pages/movie-trailer/movie-trailer';
import { BookApiProvider } from '../providers/book-api/book-api';
import { ListBooksPage } from '../pages/list-books/list-books';
import { BookDetailsPage } from './../pages/book-details/book-details';
import { MangaDetailsPage } from './../pages/manga-details/manga-details';
import { MangaPage } from './../pages/manga/manga';
import { AnimeMainPage } from './../pages/anime-main/anime-main';
import { UpcomingPage } from './../pages/upcoming/upcoming';
import { NowPlayingPage } from './../pages/now-playing/now-playing';
import { GamesApiProvider } from '../providers/games-api/games-api';
import { AnimeDescriptionModalPage } from '../pages/anime-description-modal/anime-description-modal';
import { JsonpModule } from '@angular/http';
import { LatestGamesPage } from '../pages/latest-games/latest-games';
import { ComicsApiProvider } from '../providers/comics-api/comics-api';
import { XkcdMainPage } from '../pages/xkcd-main/xkcd-main';
import { OtherComicsMainPage } from '../pages/other-comics-main/other-comics-main';
import { XkcdPageThreePage } from '../pages/xkcd-page-three/xkcd-page-three';
import { MarvelFilteredPage } from '../pages/marvel-filtered/marvel-filtered';
import { InAppBrowser } from '@ionic-native/in-app-browser';
import { OrderByPipe } from '../pipes/order-by/order-by';
import { ComicCharacterSearchPage } from '../pages/comic-character-search/comic-character-search';
import { ComicCharacterDetailsPage } from '../pages/comic-character-details/comic-character-details';
import { TriviaApiProvider } from '../providers/trivia-api/trivia-api';
import { TriviaOptionPage } from '../pages/trivia-option/trivia-option';
import { TriviaOptionBPage } from '../pages/trivia-option-b/trivia-option-b';
import { SettingsApiProvider } from '../providers/settings-api/settings-api';
import { IonicStorageModule } from '@ionic/storage';
import { HackerNewsApiProvider } from '../providers/hacker-news-api/hacker-news-api';
import { TvApiProvider } from '../providers/tv-api/tv-api';
import { AiringTodayPage } from '../pages/airing-today/airing-today';
import { PopularTvPage } from '../pages/popular-tv/popular-tv';
import { SearchTvPage } from '../pages/search-tv/search-tv';


@NgModule({
  declarations: [
    MyApp,
    MoviesPage,
    AnimePage,
    SeriesPage,
    ListBooksPage,
    SearchTvPage,
    TriviaOptionBPage,
    ComicPowerDetailsPage,
    SettingsPage,
    OnAirPage,
    AiringTodayPage,
    PopularTvPage,
    ComicCharacterSearchPage,
    GamesPage,
    ComicCharacterDetailsPage,
    OrderByPipe,
    TriviaOptionPage,
    MarvelFilteredPage,
    MarvelSearchedPage,
    // AboutPage,
    BooksPage,
    TvDetailsPage,
    XkcdDetailsPage,
    XkcdPageOnePage,
    XkcdPageFourPage,
    XkcdPageThreePage,
    XkcdPageTwoPage,
    OtherComicsMainPage,
    ComicsPage,
    NewsPage,
    XkcdMainPage,
    MarvelMainPage,
    GameTrailerPage,
    SearchedGamesPage,
    PokemonPage,
    ComingSoonGamesPage,
    TriviaPage,
    UpcomingPage,
    TopRatedPage,
    NowPlayingPage,
    PokemonDetailsPage,
    AnimeMainPage,
    MangaPage,
    AnimeDetailsPage,
    MovieTrailerPage,
    MangaDetailsPage,
    BookDetailsPage,
    LatestGamesPage,
    AnimeDescriptionModalPage
    ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AboutPageModule,
    JsonpModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    MoviesPage,
    ListBooksPage,
    SettingsPage,
    TriviaOptionBPage,
    TvDetailsPage,
    XkcdDetailsPage,
    OnAirPage,
    AiringTodayPage,
    SearchTvPage,
    PopularTvPage,
    ComicCharacterSearchPage,
    ComicPowerDetailsPage,
    XkcdPageOnePage,
    XkcdPageFourPage,
    MarvelFilteredPage,
    MarvelSearchedPage,
    TriviaOptionPage,
    ComicCharacterDetailsPage,
    XkcdPageThreePage,
    XkcdPageTwoPage,
    OtherComicsMainPage,
    MarvelMainPage,
    GameTrailerPage,
    AnimePage,
    SeriesPage,
    ComingSoonGamesPage,
    GamesPage,
    XkcdMainPage,
    SearchedGamesPage,
    // AboutPage,
    LatestGamesPage,
    BooksPage,
    ComicsPage,
    AnimeDescriptionModalPage,
    NewsPage,
    PokemonPage,
    BookDetailsPage,
    TriviaPage,
    UpcomingPage,
    TopRatedPage,
    MangaDetailsPage,
    NowPlayingPage,
    PokemonDetailsPage,
    AnimeMainPage,
    MangaPage,
    MovieTrailerPage,
    AnimeDetailsPage 
  ],
  providers: [
    StatusBar,
    SplashScreen,
    Network,
    InAppBrowser,    
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    MoviesApiProvider,
    PokemonApiProvider,
    AnimeApiProvider,
    BookApiProvider,
    GamesApiProvider,
    ComicsApiProvider,
    TriviaApiProvider,
    SettingsApiProvider,
    HackerNewsApiProvider,
    TvApiProvider
  ]
})
export class AppModule {}
