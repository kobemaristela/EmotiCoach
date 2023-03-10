import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule, NavController } from '@ionic/angular';
import { Observable } from 'rxjs';
import { SessionService } from 'src/app/services/sessions/session/session.service'; 
import { LogWorkoutPage } from './log-workout.page';

class MockSessionService{
  sessions = [];
  currentSession: Observable<any>;
  newSession: boolean = false;
  date:Date;
}

describe('Log workout page', () => {
  let component: LogWorkoutPage;
  let fixture: ComponentFixture<LogWorkoutPage>;
  let sessService: SessionService;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ LogWorkoutPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();
  }));

  beforeEach(() => {
    TestBed.configureTestingModule({
      // provide the component-under-test and dependent service
      providers: [
        LogWorkoutPage,
        { provide: SessionService, useClass: MockSessionService }
      ]
    });
    // inject both the component and the dependent service.
    component = TestBed.inject(LogWorkoutPage);
    sessService = TestBed.inject(SessionService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should add blank session', () => {
    expect(component.currentSession).toBeTruthy();
  });
 
});
