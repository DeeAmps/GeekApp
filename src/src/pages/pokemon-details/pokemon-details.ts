import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, ToastController, AlertController } from 'ionic-angular';
import { PokemonApiProvider } from '../../providers/pokemon-api/pokemon-api';
import { Network } from '@ionic-native/network';


/**
 * Generated class for the PokemonDetailsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-pokemon-details',
  templateUrl: 'pokemon-details.html',
})
export class PokemonDetailsPage {
  
  PokemonName:string;
  PokemonImage:string
  PokemonDetails : any;
  newPokemonDetail: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public pokeApi: PokemonApiProvider,
    public loadCtrl : LoadingController,
    private toastCtrl: ToastController,private network: Network, private alertCtrl: AlertController) {
    this.initializeItems()

  }


  initializeItems() {
    this.PokemonName = this.navParams.get("PokemonName");
    this.PokemonImage = this.navParams.get("PokemonImage");

    let disconnectSubscription = this.network.onDisconnect().subscribe(() => {
      this.showAlert();
    });
    
    let loading = this.loadCtrl.create({
      content: `Fetching ${this.PokemonName}'s Details`
    });
  
    loading.present();
    
    this.pokeApi.getPokemonDetails().subscribe(data => {
      this.PokemonDetails = data;
      this.newPokemonDetail = this.PokemonDetails["pokemon"].filter(
        (pokemon) => {
          return pokemon["name"].toLowerCase() == this.PokemonName.toLowerCase();
      })
     loading.dismiss();
    });
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
            this.initializeItems()
          }
        },
      ]
    });
    alert.present();
  }


}
