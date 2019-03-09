import { Injectable } from '@angular/core';
import {
  AngularFirestoreDocument,
  AngularFirestore,
  AngularFirestoreCollection
} from "angularfire2/firestore";
import {Item} from "./components/list-item/item";
import {map} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class ItemService {

  private items: AngularFirestoreCollection<Item>;
  private itemDoc: AngularFirestoreDocument<Item>;

  constructor(private db: AngularFirestore) {
    //Get the tasks collection
    this.items = db.collection<Item>('/items');
  }

  /**
   * This will add the item to the shopping list
   * @param item
   */
  addItem(item) {
    return this.items.add({name: item.name, quantity: item.quantity, purchased: false});
  }

  /**
   * This will update the selected item
   * @param item
   */
  updateItem(item) {
    this.itemDoc = this.db.doc<Item>(`/items/${item.id}`);
    this.itemDoc.update(item);
  }

  /**
   * Retrieves all items that have not been purchased
   */
  getItems() {
    return this.db.collection<Item>('/items', ref => ref.where('purchased','==', false )).snapshotChanges().pipe(map(actions => {
      return actions.map(action => {
        const data = action.payload.doc.data() as Item;
        const id = action.payload.doc.id;
        return { id, ...data };
      });
    }));
  }

  /**
   * Retrieves all purchased items
   */
  getPurchasedItems() {
    return  this.db.collection('/items', ref => ref.where('purchased','==', true )).valueChanges()
  }

  /**
   * Deletes selected item
   * @param item
   */
  deleteItem(item) {
    this.itemDoc = this.db.doc<Item>(`/items/${item.id}`);
    this.itemDoc.delete();
  }
}
