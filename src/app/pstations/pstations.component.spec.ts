import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PstationsComponent } from './pstations.component';

describe('PstationsComponent', () => {
  let component: PstationsComponent;
  let fixture: ComponentFixture<PstationsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PstationsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PstationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
