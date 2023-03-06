import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule, NavController } from '@ionic/angular';
import { Observable } from 'rxjs';
import { AccountService } from 'src/app/services/user/account.service';
import { LoginPage } from './login.page';

class MockAccountService{
  userInfo = {username: 'justin', password: 'fan'};
}

describe('LoginPage', () => {
  let component: LoginPage;
  let fixture: ComponentFixture<LoginPage>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ LoginPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // beforeEach(() => {
  //   TestBed.configureTestingModule({
  //     // provide the component-under-test and dependent service
  //     providers: [
  //       LoginPage,
  //       { provide: AccountService, useClass: MockAccountService }
  //     ]
  //   });
  //   // inject both the component and the dependent service.
  //   component = TestBed.inject(LoginPage);
  //   accountService = TestBed.inject(AccountService);
  // });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
//   it('should redirect to homepage if username and password are valid', () => {
//     component.ngOnInit();
//     expect(component.toHomepage()).toContain(AccountService.userInfo.username);
//   });
});