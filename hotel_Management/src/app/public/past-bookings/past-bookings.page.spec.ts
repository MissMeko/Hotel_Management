import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { PastBookingsPage } from './past-bookings.page';

describe('PastBookingsPage', () => {
  let component: PastBookingsPage;
  let fixture: ComponentFixture<PastBookingsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PastBookingsPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(PastBookingsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
