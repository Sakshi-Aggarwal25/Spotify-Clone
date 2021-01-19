import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchLibComponent } from './search-lib.component';

describe('SearchLibComponent', () => {
  let component: SearchLibComponent;
  let fixture: ComponentFixture<SearchLibComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SearchLibComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchLibComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
