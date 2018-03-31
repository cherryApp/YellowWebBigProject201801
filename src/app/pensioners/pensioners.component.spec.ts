import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PensionersComponent } from './pensioners.component';

describe('PensionersComponent', () => {
  let component: PensionersComponent;
  let fixture: ComponentFixture<PensionersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PensionersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PensionersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
