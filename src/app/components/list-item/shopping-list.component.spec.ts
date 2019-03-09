import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';

import { ShoppingListComponent } from './shopping-list.component';
import {BehaviorSubject} from "rxjs";
import { AngularFirestore } from 'angularfire2/firestore';
import {ItemService} from "../../item.service";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {MyMaterialModule} from "../../material-module";

const FirestoreStub = {
  collection: (name: string) => ({
    doc: (_id: string) => ({
      valueChanges: () => new BehaviorSubject({ foo: 'bar' }),
      set: (_d: any) => new Promise((resolve, _reject) => resolve()),
    }),
  }),
};

const ItemServiceStub = {
  addItem: (item: object) => new BehaviorSubject({name: 'bar', quantity: 3}),
};

describe('PurchasedListComponent', () => {
  let component: ShoppingListComponent;
  let fixture: ComponentFixture<ShoppingListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      providers: [
        { provide: AngularFirestore, useValue: FirestoreStub },
        { provide: ItemService, useValue: ItemServiceStub },
      ],
      declarations: [ ShoppingListComponent ],
      schemas: [
        CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA
      ],
      imports: [FormsModule,
        MyMaterialModule]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShoppingListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
