import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { PendingBookingsPage } from './pending-bookings.page';

describe('PendingBookingsPage', () => {
  let component: PendingBookingsPage;
  let fixture: ComponentFixture<PendingBookingsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PendingBookingsPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(PendingBookingsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
