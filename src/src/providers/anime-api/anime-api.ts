import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

/*
  Generated class for the AnimeApiProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class AnimeApiProvider {
  animeUrl:string = "https://kitsu.io/api/edge/anime";
  mangaUrl:string = "https://kitsu.io/api/edge/manga";

  trendingAnime:string = "https://kitsu.io/api/edge/trending/anime";
  trendingManga:string = "https://kitsu.io/api/edge/trending/manga";

  constructor(public http: HttpClient) {
  }

  getTrendingAnime(){
    return this.http.get(this.trendingAnime);
  }

  getTrendingManga(){
    return this.http.get(this.trendingManga);
  }

  getSearchedAnime(searchString){
    return this.http.get(encodeURI(this.animeUrl + "?filter[text]=" + searchString));
  }

  getSearchedManga(searchString){
    return this.http.get(encodeURI(this.mangaUrl + "?filter[text]=" + searchString));
  }

}
