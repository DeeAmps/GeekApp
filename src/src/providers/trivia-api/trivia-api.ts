import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

/*
  Generated class for the TriviaApiProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class TriviaApiProvider {
  triviaOptionsUrl:string = "https://api.myjson.com/bins/17uxvt";
  constructor(public http: HttpClient) {

  }

  getTriviaOptions(){
    return this.http.get(this.triviaOptionsUrl);
  }

  getRandomTrivia(){
    let pageNumber = Math.floor(Math.random() * 261) + 1;
    return this.http.get(`https://qriusity.com/v1/categories/24/questions?page=${pageNumber}`);
  }

  getTriviaOptionA(url, pageCount){
    let pageNumber = Math.floor(Math.random() * (pageCount + 1)) + 1;
    return this.http.get(url + pageNumber)
  }

  getTriviaOptionB(url){
    return this.http.get(url);
  }

}
