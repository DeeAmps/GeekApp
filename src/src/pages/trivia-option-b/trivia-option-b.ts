import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, AlertController, LoadingController, Content } from 'ionic-angular';
import { TriviaApiProvider } from '../../providers/trivia-api/trivia-api';
import { Network } from '@ionic-native/network';
/**
 * Generated class for the TriviaOptionBPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-trivia-option-b',
  templateUrl: 'trivia-option-b.html',
})
export class TriviaOptionBPage {
  triviaOption:any;
  @ViewChild(Content) content: Content;
  triviaQuestions:any;
  Organised: Array<any> = [];
  answers: Array<any> = [];
  Score:number = 0;
  showButton:boolean = false;

  constructor(public navCtrl: NavController, public navParams: NavParams,public loadCtrl : LoadingController, 
    public trivaApi : TriviaApiProvider,
    private toastCtrl: ToastController,private network: Network, private alertCtrl: AlertController) {
      this.triviaOption = this.navParams.get("Trivia");
  }

  ionViewDidLoad() {
    this.answers = [];
    this.Organised = [];
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
    this.trivaApi.getTriviaOptionB(this.triviaOption.url).subscribe(
      data => {
        this.triviaQuestions = data;
        this.triviaQuestions.results.forEach(element => {
          let rand = Math.floor(Math.random() * (element.incorrect_answers.length - 0 + 1)) + 0;
          element.incorrect_answers.splice(rand, 0, element.correct_answer);
          element.id = Math.random().toString(36).substr(2, 9);
          this.Organised.push(element);
        });
        this.showButton = true;
        loading.dismiss();
        this.content.scrollToTop();
      },
      error => {
        loading.dismiss();
        this.presentToast("Hmmm...i couldnt get you what you want! Maybe Later?")
      }
    )
    
  }

  Answered(op, correctAnswer, questionId){
    let SelectedOption = {
      "SelectedAnswer" : op, 
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
      if (this.answers[index].SelectedAnswer === this.answers[index].CorrectAnswer) {
        this.Score += 1;
      }  
    }
    let alert = this.alertCtrl.create({
      title: 'Trivia Score',
      subTitle: `You scored ${this.Score} out of ${this.answers.length }`,
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

  Decode(input){
    return new DOMParser().parseFromString(input, "text/html").documentElement.textContent;
  }

  GenerateLetter(input){
    return String.fromCharCode(97 + input);
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

  Refresh(){
    this.ionViewDidLoad();
    
  }

}
