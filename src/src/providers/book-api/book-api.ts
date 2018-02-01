import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

/*
  Generated class for the BookApiProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class BookApiProvider {
  NYTimesApiKey:string = "db18809e30aa484781af481462000c46";
  NYTimesApiUrl:string = "https://api.nytimes.com/svc/books/v3/"
  constructor(public http: HttpClient) {
  }

  getListNames(){
    return this.http.get(this.NYTimesApiUrl + "lists/names.json?api-key=" + this.NYTimesApiKey);
  }

  getLists(list){
    return this.http.get(this.NYTimesApiUrl + "lists.json?api-key=" + this.NYTimesApiKey +"&list=" + list);
  }

  getOverview(){
    return this.http.get(this.NYTimesApiUrl + "lists/overview.json?api-key=" + this.NYTimesApiKey)
  }

}
