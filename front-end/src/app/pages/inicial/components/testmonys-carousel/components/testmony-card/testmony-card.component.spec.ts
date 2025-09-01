import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TestmonyCardComponent } from './testmony-card.component';

describe('TestmonyCardComponent', () => {
  let component: TestmonyCardComponent;
  let fixture: ComponentFixture<TestmonyCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestmonyCardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TestmonyCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
