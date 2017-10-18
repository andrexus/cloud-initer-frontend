import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InstancesListComponent } from './instances-list.component';

describe('InstancesListComponent', () => {
  let component: InstancesListComponent;
  let fixture: ComponentFixture<InstancesListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InstancesListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InstancesListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
