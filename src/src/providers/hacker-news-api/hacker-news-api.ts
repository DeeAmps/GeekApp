import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

/*
  Generated class for the HackerNewsApiProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class HackerNewsApiProvider {
  topStoriesUrl:string = " https://hacker-news.firebaseio.com/v0/topstories.json?print=pretty";

  constructor(public http: HttpClient) {
    console.log('Hello HackerNewsApiProvider Provider');
  }

  getTopStories(){
    return this.http.get(this.topStoriesUrl);
  }

  getOrganisedTopStories(id){
    return this.http.get(`https://hacker-news.firebaseio.com/v0/item/${id}.json?print=pretty`)
  }

}
