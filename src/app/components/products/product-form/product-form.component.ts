import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductStore } from 'src/app/product-store/product-store';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: []
})
export class ProductFormComponent implements OnInit {

  protected productForm!: FormGroup;
  protected id!: number;
  protected isEdit: boolean = false;


  constructor(private fb: FormBuilder, private productStore: ProductStore, private router: Router, private route: ActivatedRoute) { }


  ngOnInit(): void {
    this.initializeProductForm();
    this.getCurrProduct();
  }

  private initializeProductForm = () => {
    this.productForm = this.fb.group({
      name: this.fb.control('', [Validators.required]),
      imgArr: this.fb.array([
        this.fb.control('', [Validators.required])
      ]),
      price: this.fb.control('', [Validators.required, Validators.min(0)]),
      discount: this.fb.control(0, [Validators.required, Validators.min(0), Validators.max(100)]),
      size: this.fb.control(0, [Validators.required, Validators.min(0), Validators.max(4)]),
    })
  }


  private getCurrProduct = () => {
    const { id } = this.route.snapshot.params;
    if (id) {
      const productInfo = this.productStore.find(id);
      if (productInfo) {

        (this.productForm.get('imgArr') as FormArray).clear();

        for(let _ of productInfo.imgArr) {
          (this.productForm.get('imgArr') as FormArray).push(this.fb.control('', [Validators.required]));
        }
        this.productForm.setValue(productInfo)
        this.isEdit = true;
        this.id = id;
      }
    }
  }


  protected handleSubmit = () => {
    if (this.isEdit) {
      this.productStore.edit(this.productForm.value, this.id);
      this.isEdit = false;
    } else {
      this.productStore.add(this.productForm.value);
    }
    this.productForm.reset();
    this.router.navigate(['product/list'])
  }

  getFormArr = () => {
    return this.productForm.get('imgArr') as FormArray;
  }

  addImage = () => {
    const tempControl = this.fb.control('', [Validators.required]);
    this.getFormArr().push(tempControl);
  }

  removeImage = (i: number) => {
    this.getFormArr().removeAt(i);
  }


  hasError(formControlName: string, errName: string): boolean {
    return this.productForm.get(formControlName)?.hasError(errName) || false;
  }
}
