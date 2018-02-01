import { Jsonp } from '@angular/http';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import 'rxjs/add/operator/map';

/*
  Generated class for the GamesApiProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class GamesApiProvider {
  // igdbApiUserKey:string = "38dadeb273b128e16466c0a6026e5f28";
  // igdbApiUrl:string = "https://api-2445582011268.apicast.io/";
  // igdbPlatformsUrl:string = "https://api.myjson.com/bins/1f0m17";

  giantBombPlatformsUrl:string = "https://api.myjson.com/bins/e4typ";
  upcoming2018games:string = "https://api.myjson.com/bins/cvh8x";
  giantBombAPiKey:string = "05f8a6f8f71f1115e6cf985459d9c206eb1ea30e";

  constructor(public jsonp: Jsonp, public http: HttpClient) {
  }

  getPlatforms(){
    return this.http.get(this.giantBombPlatformsUrl);
  }

  get2018UpcomingGames(){
    return this.http.get(this.upcoming2018games);
  }

  searchGames(searchString){
    return this.jsonp.request(encodeURI(`https://www.giantbomb.com/api/search/?api_key=${this.giantBombAPiKey}` + `&format=jsonp&json_callback=JSONP_CALLBACK` + `&resources=game&limit=20&query=${searchString}&field_list=deck,guid,id,image,name,platforms`)).map(res => res.json());
  }

  getLatestGames(platformId){
    return this.jsonp.request(`https://www.giantbomb.com/api/games/?api_key=${this.giantBombAPiKey}` + `&format=jsonp&json_callback=JSONP_CALLBACK` + `&limit=10&platforms=${platformId}&field_list=deck,id,image,guid,expected_release_year,name,original_release_date,platforms&sort=original_release_date:desc`).map(res => res.json());
  }

}
