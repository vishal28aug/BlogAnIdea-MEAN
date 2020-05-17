import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddBlogButtonComponent } from './add-blog-button.component';

describe('AddBlogButtonComponent', () => {
  let component: AddBlogButtonComponent;
  let fixture: ComponentFixture<AddBlogButtonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddBlogButtonComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddBlogButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
