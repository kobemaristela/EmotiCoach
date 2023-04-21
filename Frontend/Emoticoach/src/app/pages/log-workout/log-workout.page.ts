import { Component, OnInit, OnDestroy,ViewChild, ViewContainerRef } from '@angular/core';
import { SessionService } from 'src/app/services/sessions/session/session.service';
import { session } from 'src/app/services/sessions/session/Isession';
import { Session } from 'src/app/services/sessions/session/Session';
import { Activity } from 'src/app/services/sessions/activity/Activity';
import { MUSCLE_LIST } from 'src/environments/environment';
import { Observable, Subject, Subscription, debounceTime, map, throttleTime } from 'rxjs';
import { AlertController } from '@ionic/angular';
import { muscleOpacity, muscleOptions } from '../widgets/muscle-groups/muscle-svg/IOpacity-muscle';

@Component({
  selector: 'app-log-workout',
  templateUrl: './log-workout.page.html',
  styleUrls: ['./log-workout.page.scss'],
})
export class LogWorkoutPage implements OnInit, OnDestroy {
  currentSession: session;
  currentSession$: Subject<session>;
  muscleList = MUSCLE_LIST;
  subscriber: Subscription;

  opacity: muscleOpacity;


  constructor(private servSession: SessionService, private alertController: AlertController) {
    this.currentSession = new Session("");  

  }

  ngOnInit(): void {
    this.opacity = {
      chest: 0,
      tricep: 0,
      bicep: 0,
      shoulder: 0,
      upper_back: 0,
      lower_back: 0,
      quadricep: 0,
      glute: 0,
      calve: 0,
      abdominal: 0,
      hamstring: 0 
    } 
    this.loadSession(); 
    this.servSession.clearDeletes();
    
  }

  ngOnDestroy(): void {
    this.subscriber.unsubscribe()
  }

  addNewComponent(){
    console.log("adding acitvity");
    this.servSession.addActivity();
    this.loadSession();

  }

  loadSession(){
    this.currentSession$ = this.servSession.getCurrentSession();
    this.currentSession$.pipe(throttleTime(1000))
    this.subscriber = this.currentSession$.subscribe( data => {
      console.log("loading session", data);
      this.currentSession = data;
      this.currentSession.duration = this.currentSession.duration == 0 ? undefined :  this.currentSession.duration;

      console.log(this.currentSession)
      this.loadMuscleGroups();
    })
  }

  loadMuscleGroups(){
    this.opacity = {
      chest: 0,
      tricep: 0,
      bicep: 0,
      shoulder: 0,
      upper_back: 0,
      lower_back: 0,
      quadricep: 0,
      glute: 0,
      calve: 0,
      abdominal: 0,
      hamstring: 0 
    }; 

    for(let i = 0; i < this.currentSession.activities.length; i++){
      this.currentSession.activities[i].muscleGroups.forEach(muscle => {
       this.opacity[muscle] = 1;
    })};
   
  }

  saveSession(){
    //run checks to see if all fields have a value 
    let canSave = true;
    if (!this.currentSession.name) {
      canSave = false;
    }
    if (!this.currentSession.duration) {
      canSave = false;
    }
    if (!this.currentSession.datetime) {
      canSave = false;
    }

    for (let i = 0; i < this.currentSession.activities.length; i++){
      if (!this.currentSession.activities[i].name){
        canSave = false;
       
      }
      for (let x = 0; x < this.currentSession.activities[i].sets.length; x++) {
        if (!this.currentSession.activities[i].sets[x].reps){
          canSave = false;
        }
        if (!this.currentSession.activities[i].sets[x].rpe){
          canSave = false;
        }
        if (!this.currentSession.activities[i].sets[x].weight){
          canSave = false;
        }
        if (!canSave){
          break;
        }
      }
      if (!canSave){
        break;
      }
    }

    if (canSave) {
      console.log("saving in logworkout", this.currentSession);
      this.servSession.saveSession(); 
      this.servSession.getSessions();
      this.presentAlert("Save Succesfull","","");
      
    } else {
      this.presentAlert("Empty Field","","Please fill out all fields before saving.");
    }

  }
  

  async presentAlert(header:string, subheader:string, message:string) {
    const alert = await this.alertController.create({
      header: header,
      subHeader: subheader,
      message: message,
      buttons: ['OK'],
    });

    await alert.present();
  }

  goBack(){
    
  }

  
  
  
}
