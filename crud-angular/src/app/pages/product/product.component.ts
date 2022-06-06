import {Component, OnInit, TemplateRef} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {BsModalRef, BsModalService} from "ngx-bootstrap/modal";
import {Subject, takeUntil} from "rxjs";
import {Store} from "@ngrx/store";
import {AppState} from "../../store/app.reducer";
import {selectOrders} from "../../store/selectors/order.selector";
import {createProduct, deleteProduct, updateProduct} from "../../store/actions";
import {SwalAlert} from "../../utils/SwalAlert";
import {selectProducts} from "../../store/selectors/product.selector";

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {

  formData: FormGroup | any;
  modalRef: BsModalRef;
  products: any;
  orders: any;
  editingId: any = null;
  destroy$: Subject<boolean> = new Subject<boolean>();

  constructor(private readonly store: Store<AppState>,
              private fb: FormBuilder,
              private modalService: BsModalService) {

    this.formData = this.fb.group({
      id_order: this.fb.control('', [Validators.nullValidator,  Validators.required]),
      value_unit: this.fb.control('', [Validators.nullValidator, Validators.required]),
      unit: this.fb.control('', [Validators.nullValidator, Validators.required]),
      description: this.fb.control('', [Validators.nullValidator, Validators.required]),
      sku: this.fb.control('', [Validators.nullValidator, Validators.required]),
      quantity: this.fb.control('', [Validators.nullValidator, Validators.required]),
      qty_box: this.fb.control('', [Validators.nullValidator, Validators.required]),
      weight: this.fb.control('', [Validators.nullValidator, Validators.required]),
      volumen: this.fb.control('', [Validators.nullValidator, Validators.required]),
      mark: this.fb.control('', [Validators.nullValidator, Validators.required]),
      //status: this.fb.control('', [Validators.nullValidator, Validators.required])
    });
  }

  ngOnInit(): void {
    this.store.select(selectOrders).pipe(
      takeUntil(this.destroy$)
    ).subscribe(data => this.orders = data.orders)

    this.store.select(selectProducts).pipe(
      takeUntil(this.destroy$)
    ).subscribe(data => this.products = data.products)
  }

  onSubmit() {
    const product = Object.assign({}, this.formData.value)
    if (!this.editingId) {
      this.store.dispatch(createProduct({product}))
    } else {
      product.id = this.editingId
      this.store.dispatch(updateProduct({product}))
      this.editingId = null
    }
    this.modalService.hide()
  }

  openModal(template: TemplateRef<any>, product: any) {
    this.editingId = null
    if (product) {
      this.editingId = product.id
      this.formData.setValue(Object.fromEntries(Object.entries(product).filter(([key]) => {
        return Object.keys(this.formData.value).includes(key)
      })))
    } else {
      console.log('FORM DATA', this.formData.value)
      this.formData.reset()
    }
    console.log('FORM DATA', this.formData.value)
    this.modalRef = this.modalService.show(template);
  }

  delete(product: any) {
    let title = '¿Estas seguro de eliminar el producto?'
    let text = ''
    if (!product.status) {
      title = '¿Estas seguro de activar el producto?'
    }
    SwalAlert.showDelete(() => {
      this.store.dispatch(deleteProduct({id: product.id}));
    }, title, text)
  }
}
