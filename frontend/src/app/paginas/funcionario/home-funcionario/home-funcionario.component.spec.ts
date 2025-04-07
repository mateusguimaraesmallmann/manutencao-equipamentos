import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeFuncionarioComponent } from './home-funcionario.component';

describe('HomeFuncionarioComponent', () => {
  let component: HomeFuncionarioComponent;
  let fixture: ComponentFixture<HomeFuncionarioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HomeFuncionarioComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(HomeFuncionarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
