import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ProductStore } from 'src/app/product-store/product-store';
import { ProductDeleteConfirmationComponent } from '../product-delete-confirmation/product-delete-confirmation.component';


@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: []
})
export class ProductListComponent {



  constructor(protected productStore: ProductStore, protected dialog: MatDialog, protected router: Router) { }



  openDialog(enterAnimationDuration: string, exitAnimationDuration: string, index: number): void {
    const dialogRef = this.dialog.open(ProductDeleteConfirmationComponent, {
      enterAnimationDuration,
      exitAnimationDuration
    })

    dialogRef.afterClosed().subscribe((res: boolean) => {
      if (res) {
        this.productStore.delete(index)
      }
    });
  }

}
