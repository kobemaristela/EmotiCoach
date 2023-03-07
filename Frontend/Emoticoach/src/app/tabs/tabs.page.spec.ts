import { ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { TabsPage } from './tabs.page';


describe('TabsPage', () => {
  let tabsPage: TabsPage;
  let fixture: ComponentFixture<TabsPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TabsPage ],
      imports: [ IonicModule.forRoot() ]
    }).compileComponents();

    fixture = TestBed.createComponent(TabsPage);
    tabsPage = fixture.componentInstance;
    fixture.detectChanges();
  });


  it('should create', () => {
    expect(tabsPage).toBeTruthy();
  });

  it('should have tabs', () => {
    // const tabs = fixture.nativeElement.querySelectorAll('ion-tab-button');
    // expect(tabs.length).toEqual(3);
  });

});

