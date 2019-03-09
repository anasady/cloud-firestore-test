import { Component } from '@angular/core';
import { ItemService } from "../../item.service";
import {Observable} from "rxjs";

/**
 * Displays all purchased items and the quantity of each one.
 * The user is allowed to delete any item from the list
 */
@Component({
  selector: 'purchased-list',
  templateUrl: './purchased-list.component.html',
  styleUrls: ['./purchased-list.component.scss']
})
export class PurchasedListComponent {

  public items: Observable<any[]>;

  constructor(private itemService: ItemService) {
    this.items = this.itemService.getPurchasedItems();
  }

  deleteItem(item) {
    this.itemService.deleteItem(item);
  }
}

