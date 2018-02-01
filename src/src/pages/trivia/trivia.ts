import { TriviaOptionBPage } from './../trivia-option-b/trivia-option-b';
import { TriviaOptionPage } from './../trivia-option/trivia-option';
import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, AlertController, LoadingController, Content } from 'ionic-angular';
import { TriviaApiProvider } from '../../providers/trivia-api/trivia-api';
import { Network } from '@ionic-native/network';

/**
 * Generated class for the TriviaPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-trivia',
  templateUrl: 'trivia.html',
})
export class TriviaPage {
  randomTrivia:any;
  @ViewChild(Content) content: Content;
  disabled:boolean = false;
  triviaOptions:any;
  answers: Array<any> = [];
  Score:number = 0;
  constructor(public navCtrl: NavController, public navParams: NavParams,public loadCtrl : LoadingController, 
    public triviaApi : TriviaApiProvider,
    private toastCtrl: ToastController,private network: Network, private alertCtrl: AlertController) {
  }

  ionViewDidLoad() {
    this.answers = [];
    this.Score = 0;
    this.randomTrivia;
    let disconnectSubscription = this.network.onDisconnect().subscribe(() => {
      this.showAlert();
    });
    let loading = this.loadCtrl.create({
      content: 'Loading Trivia..',
    });
    loading.present();
    this.triviaApi.getRandomTrivia().subscribe(
      data => {
        this.randomTrivia = data;
        loading.dismiss();
        this.content.scrollToTop();
      },
      error => {
        loading.dismiss();
        this.presentToast("Hmmm...i couldnt get you what you want! Maybe Later?")
      }
    );
  }

  Refresh(){
    this.ionViewDidLoad();
  }

  ShowCategories(){
    let alert = this.alertCtrl.create();
    alert.setTitle('Select Category');
    let loading = this.loadCtrl.create({
      content: 'Retrieving Trivia Categories..',
    });
    loading.present();
    this.triviaApi.getTriviaOptions().subscribe( 
      data => {
        this.triviaOptions = data;
        this.triviaOptions.forEach(element => {
          if (element.name === "Random") {
            alert.addInput({
              type: 'radio',
              label: element.name,
              value: element,
              checked: true
            })
          }
          else
          {
            alert.addInput({
              type: 'radio',
              label: element.name,
              value: element
            })
          }
        });
        alert.addButton('Cancel');
        alert.addButton({
          text: 'OK',
          handler: data => {
            if (data.pageCount === 0) {
              this.navCtrl.push(TriviaOptionBPage, { "Trivia" : data })
            }
            else{
              this.navCtrl.push(TriviaOptionPage, { "Trivia" : data })
            }
          }
        });
        loading.dismiss();
        alert.present();
      }
    )
  }

  Answered(optionValue, correctAnswer, questionId){
    let SelectedOption = { 
      "SelectedOption" : optionValue, 
      "CorrectAnswer" :  correctAnswer, 
      "QuestionId" :  questionId
    }
    let index = this.answers.findIndex(x => x.QuestionId == questionId);
    if (index === -1) {
      this.answers.push(SelectedOption);
    }
    else{
      this.answers.splice(index , 1);
      this.answers.push(SelectedOption);
    }
    
  }
  
  CalculateResults(){
    for (let index = 0; index < this.answers.length; index++) {
      if (this.answers[index].SelectedOption === this.answers[index].CorrectAnswer) {
        this.Score += 1;
      }  
    }
    let alert = this.alertCtrl.create({
      title: 'Trivia Score',
      subTitle: `You scored ${this.Score} out of ${this.answers.length}`,
      buttons: [
        {
          text: 'OK',
          role: 'ok',
          handler: () => {
            this.ionViewDidLoad();
          }
        },
      ]
    });
    alert.present();

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
            this.ionViewDidLoad()
          }
        },
      ]
    });
    alert.present();
  }

}
