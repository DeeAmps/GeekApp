import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

/*
  Generated class for the SettingsApiProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class SettingsApiProvider {
  settingsMenuUrl:string = "https://api.myjson.com/bins/9etld";

  constructor(public http: HttpClient) {
    console.log('Hello SettingsApiProvider Provider');
  }

  getSettingsMenu(){
    return this.http.get(this.settingsMenuUrl);
  }

}
