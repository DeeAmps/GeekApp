import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';

/*
  Generated class for the PokemonApiProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class PokemonApiProvider {
  pokemons:string = "https://api.myjson.com/bins/1eydsb";
  pokemonDetails:string = "https://api.myjson.com/bins/1a3i9f";
  items:any =[];
  constructor(public http: HttpClient) {
  }

  getPokemons(){
    return this.http.get(this.pokemons);
  }

  getPokemonDetails(){
    return this.http.get(this.pokemonDetails);
  }

}
