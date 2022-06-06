import {Component, OnInit, TemplateRef} from '@angular/core';
import {Store} from "@ngrx/store";
import {selectOrders} from "../../store/selectors/order.selector";
import {AppState} from "../../store/app.reducer";
import {Subject, takeUntil} from "rxjs";
import {BsModalRef, BsModalService} from "ngx-bootstrap/modal";
import {FormGroup, FormControl, Validators, FormBuilder} from '@angular/forms';
import {selectUsers} from "../../store/selectors/user.selector";
import {createOrder, deleteOrder} from "../../store/actions";
import {updateOrder} from "../../store/actions/order.action";
import {SwalAlert} from "../../utils/SwalAlert";

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {

  formData: FormGroup | any;
  modalRef: BsModalRef;
  orders: any;
  users: any;
  editingId: any = null;
  destroy$: Subject<boolean> = new Subject<boolean>();

  constructor(private readonly store: Store<AppState>,
              private fb: FormBuilder,
              private modalService: BsModalService) {

    this.formData = this.fb.group({
      id_user: this.fb.control('', [Validators.nullValidator,  Validators.required]),
      order_number: this.fb.control('', [Validators.nullValidator, Validators.required]),
      date_time: this.fb.control('', [Validators.nullValidator, Validators.required]),
      provider_name: this.fb.control('', [Validators.nullValidator, Validators.required]),
      observation: this.fb.control('', [Validators.nullValidator, Validators.required]),
      total_value: this.fb.control('', [Validators.nullValidator, Validators.required])
    });

  }

  ngOnInit(): void {
    this.store.select(selectOrders).pipe(
      takeUntil(this.destroy$)
    ).subscribe(data => this.orders = data.orders)

    this.store.select(selectUsers).pipe(
      takeUntil(this.destroy$)
    ).subscribe(data => this.users = data.users)
  }

  onSubmit() {
    const order = Object.assign({}, this.formData.value)
    if (!this.editingId) {
      this.store.dispatch(createOrder({order}))
    } else {
      order.id = this.editingId
      this.store.dispatch(updateOrder({order}))
      this.editingId = null
    }
  }

  openModal(template: TemplateRef<any>, order: any) {
    this.editingId = null
    if (order) {
      this.editingId = order.id
      this.formData.setValue(Object.fromEntries(Object.entries(order).filter(([key]) => {
        return Object.keys(this.formData.value).includes(key)
      })))
    } else {
      console.log('FORM DATA', this.formData.value)
      this.formData.reset()
    }
    console.log('FORM DATA', this.formData.value)
    this.modalRef = this.modalService.show(template);
  }

  delete(order: any) {
    let title = '¿Estas seguro de eliminar la orden?'
    let text = ''
    if (!order.status) {
      title = '¿Estas seguro de activar la orden?'
    }

    SwalAlert.showDelete(() => {
      this.store.dispatch(deleteOrder({ id: order.id }));
    }, title, text)
  }

}
