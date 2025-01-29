import { ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { TrainingList } from './training-list.page';

describe('TrainingList', () => {
  let component: TrainingList;
  let fixture: ComponentFixture<TrainingList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TrainingList],
      imports: [IonicModule.forRoot()],
    }).compileComponents();

    fixture = TestBed.createComponent(TrainingList);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
