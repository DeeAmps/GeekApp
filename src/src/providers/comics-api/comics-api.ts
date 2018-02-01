import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Jsonp } from '@angular/http';
import 'rxjs/add/operator/map';
import {Md5} from 'ts-md5/dist/md5';

/*
  Generated class for the ComicsApiProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ComicsApiProvider {
  comicVineApiKey:string = "ff248447992b92142178abbd231144f96d4be1d9";
  comicVineUrl:string = " https://comicvine.gamespot.com/api";
  
  xkcdCurrentComicUrl:string = "https://dynamic.xkcd.com/api-0/jsonp/comic/";
  xkcdOpenComicsPagesOne:string = "https://api.myjson.com/bins/970q9";
  xkcdOpenComicsPagesTwo:string = "https://api.myjson.com/bins/is3kh";
  xkcdOpenComicsPagesThree:string = "https://api.myjson.com/bins/df74h";
  xkcdOpenComicsPagesFour:string = "https://api.myjson.com/bins/82aoh";

  marvelApiPublicKey:string = "cb7fce38e00ff946df9979d33df6d352";
  marvelApiPrivateKey:string = "c3d8f4957438b2c6ed334d241ceb607c5ee01460";

  marvelApiUrl:string = "https://gateway.marvel.com:443/v1/public/";
  filterDescriptor = "https://api.myjson.com/bins/10g1ux"

  constructor(public jsonp: Jsonp,public http: HttpClient) {
  }

  getDateDescriptionMarvelComics(){
    return this.http.get(this.filterDescriptor);
  }

  getXKCDTodaysComic(){
    return this.jsonp.request(this.xkcdCurrentComicUrl + "?callback=JSONP_CALLBACK");
  }

  getXKCDOpenComicsPagesOne(){
    return this.http.get(this.xkcdOpenComicsPagesOne)
  }

  getXKCDOpenComicsPagesTwo(){
    return this.http.get(this.xkcdOpenComicsPagesTwo)
  }

  getXKCDOpenComicsPagesThree(){
    return this.http.get(this.xkcdOpenComicsPagesThree)
  }

  getXKCDOpenComicsPagesFour(){
    return this.http.get(this.xkcdOpenComicsPagesFour)
  }

  getMarvelDateRangeComic(dateRange){
    let timestamp = Date.now();
    let hash = this.GenerateHash(timestamp)
    return this.http.get(this.marvelApiUrl + `comics?format=comic&dateDescriptor=${dateRange}&limit=20&ts=${timestamp}&apikey=${this.marvelApiPublicKey}&hash=${hash}`)
  }

  getMarvelSearchedCharacter(searchString){
    let timestamp = Date.now();
    let hash = this.GenerateHash(timestamp);
    return this.http.get(encodeURI(this.marvelApiUrl + `characters?nameStartsWith=${searchString}&limit=20&ts=${timestamp}&apikey=${this.marvelApiPublicKey}&hash=${hash}`))
  }

  getComicBookPowers(offset){
    return this.jsonp.request(`http://comicvine.gamespot.com/api/powers/?api_key=${this.comicVineApiKey}` + `&format=jsonp&json_callback=JSONP_CALLBACK&limit=30&offset=${offset}`).map(res => res.json())
  }

  getCharactersbyPower(url){
    return this.jsonp.request(`${url}` +`?api_key=${this.comicVineApiKey}` + `&format=jsonp&json_callback=JSONP_CALLBACK&limit=50&field_list=api_details_url,characters,name`).map(res => res.json())
  }

  getCharactersDetails(url){
    return this.jsonp.request(`${url}` +`?api_key=${this.comicVineApiKey}` + `&format=jsonp&json_callback=JSONP_CALLBACK&field_list=name,image,orgin,moviesgender,deck,real_name,powers,creators`).map(res => res.json())
  }

  getSearchedCharacter(name){
    return this.jsonp.request(encodeURI(`http://comicvine.gamespot.com/api/search/?api_key=${this.comicVineApiKey}` +`&format=jsonp&json_callback=JSONP_CALLBACK&`+ `&limit=20&query=${name}&resources=character,person&field_list=name,deck,image,publisher,origin,real_name`)).map(res => res.json())
  }

  GenerateHash(time){
    let hash = time + this.marvelApiPrivateKey + this.marvelApiPublicKey
    return Md5.hashStr(hash);
  }

}
