import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class MoviesApiProvider {
  apiUrl:string = "https://api.themoviedb.org/3/movie";
  apiKey:string =  "6b12c26f2301ccb53cc292088c4f1741";
  UpcomingUrl:string = "https://api.myjson.com/bins/i1ucp";
  constructor(public http: HttpClient) {
  }

  getNowPlayingMovies(){
    return this.http.get(this.apiUrl + "/now_playing?api_key=" + this.apiKey);
  }

  getUpcomingMovies(){
    return this.http.get(this.UpcomingUrl);
  }

  getTopRatedMovies(){
    var pageNumber = Math.floor(Math.random() * 7 ) + 1;
    return this.http.get(this.apiUrl + "/top_rated?api_key=" + this.apiKey + "&page=" + pageNumber);
  }

}
