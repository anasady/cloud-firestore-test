import { Component } from '@angular/core';
import { Item } from './item';
import { ItemService} from "../../item.service";

/**
 * Allows the user to add an item to the list
 */
@Component({
  selector: 'shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.scss']
})

export class ShoppingListComponent {
  item = new Item();

  constructor(private itemService: ItemService) {
    this.itemService = itemService;
  }

  onSubmit(){
    this.itemService.addItem(this.item)
      .then(
        res => {
          this.resetFields();
        }
      )
  }

  resetFields() {
    this.item = new Item();
  }
}
