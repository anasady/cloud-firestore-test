import {Component, CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA} from '@angular/core';
import {DataSource} from "@angular/cdk/table";
import {ItemService} from "../../item.service";

/**
 * This component will list all items that have not been purchased.  The user can check off each item as they purchase it.
 * Once the item is purchased it will be removed from this list
 */

@Component({
  selector: 'list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
})
export class ListComponent {

  public dataSource;
  displayedColumns = ['name', 'quantity', 'purchased'];

  constructor(private itemService: ItemService) {
    this.dataSource = new ItemDataSource(itemService);
  }

  purchase(item) {
    item.purchased = !item.purchased;
    this.itemService.updateItem(item);
  }

}


export class ItemDataSource extends DataSource<any> {

  constructor(private itemService: ItemService) {
    super()
  }

  connect() {
    return this.itemService.getItems();
  }

  disconnect() {

  }
}
