import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';

import { PurchasedListComponent } from './purchased-list.component';
import {BehaviorSubject} from "rxjs";
import { AngularFirestore } from 'angularfire2/firestore';
import {ItemService} from "../../item.service";

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
  getPurchasedItems: () => new BehaviorSubject([{name: 'bar', quantity: 3}]),
  deleteItem: (item: object) => new BehaviorSubject({name: 'bar', quantity: 3}),
};

describe('PurchasedListComponent', () => {
  let component: PurchasedListComponent;
  let fixture: ComponentFixture<PurchasedListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      providers: [
        { provide: AngularFirestore, useValue: FirestoreStub },
        { provide: ItemService, useValue: ItemServiceStub },
      ],
      declarations: [ PurchasedListComponent ],
      schemas: [
        CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PurchasedListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
