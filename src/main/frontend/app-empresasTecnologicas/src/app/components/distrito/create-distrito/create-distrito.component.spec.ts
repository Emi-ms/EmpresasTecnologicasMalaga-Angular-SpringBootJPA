import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateDistritoComponent } from './create-distrito.component';

describe('CreateDistritoComponent', () => {
  let component: CreateDistritoComponent;
  let fixture: ComponentFixture<CreateDistritoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateDistritoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CreateDistritoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
