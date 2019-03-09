import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';

import { ListComponent } from './list.component';
import {BehaviorSubject} from "rxjs";
import { AngularFirestore } from 'angularfire2/firestore';
import {ItemService} from "../../item.service";
import {FormsModule} from "@angular/forms";
import {MyMaterialModule} from "../../material-module";

const FirestoreStub = {
  collection: (name: string) => ({
    doc: (_id: string) => ({
      valueChanges: () => new BehaviorSubject({name: 'bar', quantity: 3}),
      snapshotChanges: () => new BehaviorSubject({name: 'bar', quantity: 3}),
      set: (_d: any) => new Promise((resolve, _reject) => resolve()),
    }),
  }),
};

const ItemServiceStub = {
  getItems: () => new BehaviorSubject([{name: 'bar', quantity: 3}]),
  updateItem: (item: object) => new BehaviorSubject({name: 'bar', quantity: 3}),
};

describe('ListComponent', () => {
  let component: ListComponent;
  let fixture: ComponentFixture<ListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      providers: [
        { provide: AngularFirestore, useValue: FirestoreStub },
        { provide: ItemService, useValue: ItemServiceStub },
      ],
      declarations: [ ListComponent ],
      schemas: [
        CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA
      ],
      imports: [FormsModule,
        MyMaterialModule]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
