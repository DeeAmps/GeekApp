import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, LoadingController, ToastController } from 'ionic-angular';
import { PokemonApiProvider } from '../../providers/pokemon-api/pokemon-api';
import { MoviesApiProvider } from '../../providers/movies-api/movies-api';
import { Network } from '@ionic-native/network';
import { PokemonDetailsPage } from '../pokemon-details/pokemon-details';

/**
 * Generated class for the PokemonPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-pokemon',
  templateUrl: 'pokemon.html'
})
export class PokemonPage {
  pokemonNames:any;
  searchQuery: string = '';
  items: any;
  constructor(public navCtrl: NavController, public navParams: NavParams, public pokeApi : PokemonApiProvider,
    public loadCtrl : LoadingController, public movieApi : MoviesApiProvider,
    private toastCtrl: ToastController,private network: Network, private alertCtrl: AlertController) {
      this.InitialLoad();
  }

  InitialLoad() {
    let disconnectSubscription = this.network.onDisconnect().subscribe(() => {
      this.showAlert();
    });
    
    let loading = this.loadCtrl.create({
      content: 'Retrieving Pokemons...'
    });
  
    loading.present();
    this.pokeApi.getPokemons()
    .subscribe(
      data => {
        this.pokemonNames = data;
        loading.dismiss();
    },
      error => {
        loading.dismiss();
        this.presentToast("Hmmm...i couldnt get you what you want! Maybe Later?")
      });
  }

  getDetails(item){
    this.navCtrl.push(PokemonDetailsPage, {
      PokemonName : item.name,
      PokemonImage: item.image
    });
  }

  initializeItems(){
    this.pokeApi.getPokemons()
    .subscribe(
      data => {
        this.pokemonNames = data;
    })
  }

  getItems(ev: any) {
    // Reset items back to all of the items
    //this.initializeItems()
    let val = ev.target.value;
    if (val && val.trim() != '') {
      this.pokemonNames = this.pokemonNames.filter((item) => {
        if (item.name.toLowerCase().startsWith(val.toLowerCase())){
          return item;
        };
      })
    }
    else{
      this.initializeItems()
    }
  }


  presentToast(message, duration = 5000) {
    let toast = this.toastCtrl.create({
      message: message,
      duration: duration,
      position: 'button'
    });
    toast.present();
  }

  showAlert(){
    let alert = this.alertCtrl.create({
      title: "Connection Lost",
      subTitle: 'Oh Internet, Where art thou? :(',
      buttons: [
        {
          text: 'Try Again',
          handler: data => {
            this.InitialLoad()
          }
        },
      ]
    });
    alert.present();
  }

}
