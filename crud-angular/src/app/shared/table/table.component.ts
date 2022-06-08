import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit {
  @Input() headers: any[]
  @Input() rows: any[]
  @Input() options: any[]
  @Output() eventEdit = new EventEmitter<any>()
  @Output() eventDelete = new EventEmitter<any>()

  ngOnInit(): void {
    if (this.options.length === 0) {
      this.options = [
        /*{
          event: 'edit', buttons: [
            { class: 'btn-outline-secondary', icon: ['far', 'edit'] },
          ]
        },
        {
          event: 'delete', buttons: [
            { class: 'btn-outline-danger', icon: ['far', 'trash-alt'], status: true },
            { class: 'btn-outline-success', icon: ['far', 'check-circle'], status: false }
          ]
        },*/
        { class: 'btn-outline-secondary', icon: ['far', 'edit'], event: 'edit' },
        { class: 'btn-outline-danger', icon: ['far', 'trash-alt'], event: 'delete', status: true },
        { class: 'btn-outline-success', icon: ['far', 'check-circle'], event: 'delete', status: false }
      ]
    }
  }

  callbackEvent(callback: any, object: Object) {
    console.log(callback)
    switch (callback) {
      case 'delete':
        this.eventDelete.emit(object)
        break
      case 'edit':
        this.eventEdit.emit(object)
        break
      default:
        console.log('No hay eventos asignados')
    }
  }
}
