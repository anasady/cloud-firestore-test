import {TestBed} from '@angular/core/testing';

import {ItemService} from './item.service';
import {BehaviorSubject} from "rxjs";
import {AngularFirestore} from 'angularfire2/firestore';

const FirestoreStub = {
  collection: (name: string) => ({
    doc: (_id: string) => ({
      valueChanges: () => new BehaviorSubject({name: 'bar', quantity: 3}),
      snapshotChanges: () => new BehaviorSubject({name: 'bar', quantity: 3}),
      set: (_d: any) => new Promise((resolve, _reject) => resolve()),
    }),
  }),
};

describe('ItemService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      {provide: AngularFirestore, useValue: FirestoreStub},
    ],
  }));

  it('should be created', () => {
    const service: ItemService = TestBed.get(ItemService);
    expect(service).toBeTruthy();
  });
});
