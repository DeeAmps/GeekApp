import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, AlertController, LoadingController, Content } from 'ionic-angular';
import { TriviaApiProvider } from '../../providers/trivia-api/trivia-api';
import { Network } from '@ionic-native/network';

/**
 * Generated class for the TriviaOptionPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-trivia-option',
  templateUrl: 'trivia-option.html',
})
export class TriviaOptionPage {
  triviaOption:any;
  triviaQuestions:any;
  @ViewChild(Content) content: Content;
  answers: Array<any> = [];
  Score:number = 0;
  showButton:boolean = false
  constructor(public navCtrl: NavController, public navParams: NavParams,public loadCtrl : LoadingController, 
    public trivaApi : TriviaApiProvider,
    private toastCtrl: ToastController,private network: Network, private alertCtrl: AlertController) {
      this.triviaOption = this.navParams.get("Trivia");
  }

  ionViewDidLoad() {
    this.answers = [];
    this.Score = 0;
    this.triviaQuestions;
    this.showButton = false;

    let disconnectSubscription = this.network.onDisconnect().subscribe(() => {
      this.showAlert();
    });
    let loading = this.loadCtrl.create({
      content: 'Loading Trivia..',
    });
    loading.present();
    
    this.trivaApi.getTriviaOptionA(this.triviaOption.url, this.triviaOption.pageCount).subscribe(
      data => {
        this.triviaQuestions = data;
        loading.dismiss();
        this.showButton = true;
        this.content.scrollToTop();
      },
      error => {
        loading.dismiss();
        this.presentToast("Hmmm...i couldnt get you what you want! Maybe Later?")
      }
    )
  }

  CalculateResults(){
    console.log(this.answers);
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

  Refresh(){
    this.ionViewDidLoad();

  }

  Answered(optionValue, correctAnswer, questionId){
    let SelectedOption = { 
      "SelectedOption" : optionValue, 
      "CorrectAnswer" :  correctAnswer, 
      "QuestionId" :  questionId
    }
    let index = this.answers.findIndex(x => x.QuestionId == questionId);
    console.log(index);
    if (index === -1) {
      this.answers.push(SelectedOption);
    }
    else{
      this.answers.splice(index , 1);
      this.answers.push(SelectedOption);
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
            this.ionViewDidLoad()
          }
        },
      ]
    });
    alert.present();
  }

}
