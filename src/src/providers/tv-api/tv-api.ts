import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Jsonp } from '@angular/http';

/*
  Generated class for the TvApiProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class TvApiProvider {
  apiUrl:string = "https://api.themoviedb.org/3/tv";
  apiKey:string =  "6b12c26f2301ccb53cc292088c4f1741";

  constructor(public http: HttpClient, public jsonp: Jsonp) {
  }

  getShowsAiringToday(){
    return this.http.get(this.apiUrl + "/airing_today?api_key=" + this.apiKey);
  }

  EpisodeInNext7days(){
    return this.http.get(this.apiUrl + "/on_the_air?api_key=" + this.apiKey);
  }

  getPopularTVShows(){
    return this.http.get(this.apiUrl + "/popular?api_key=" + this.apiKey);
  }

  getNewlyCreatedShows(){
    return this.http.get(this.apiUrl + "/latest?api_key=" + this.apiKey);
  }

  searchTVSeries(query){
    return this.jsonp.request(encodeURI("https://api.themoviedb.org/3/search/tv/?api_key=" + this.apiKey + "&query=" + query +"&callback=JSONP_CALLBACK")).map( res =>  res.json() ) ;
  }

  getTVDetails(id){
    return this.http.get(`https://api.themoviedb.org/3/tv/${id}?api_key=${this.apiKey}&language=en-US`)
  }

}
