import { Component, OnInit } from '@angular/core';
import {CustomerService} from './service/customer.service';
import {Customer} from './model/customer';
import {ModalWindowComponent} from './modal-window/modal-window.component';
import {NgbModal, NgbModalOptions} from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.scss'],
  providers: [CustomerService]
})
export class CustomerComponent implements OnInit {
  customer;
  columnDefs;
  rowData;
  isSelected = false;
  selectedRow;

  constructor(private customerSevice: CustomerService, private modalService: NgbModal) {
    this.columnDefs = [
      {headerName: 'Name', field: 'name'},
      {headerName: 'Surname', field: 'surname'},
      {headerName: 'Telephone Number', field: 'phone' },
      {headerName: 'Address', field: 'address'},
    ];
  }

  ngOnInit() {
    this.customerSevice.getCustomersHttp().subscribe(this.onGetSuccess.bind(this),
      this.onFailure.bind(this, 'get customers'),
      this.onCompleted.bind(this)
    );
  }

  private onGetSuccess(customers: Customer[]) {
    this.customer = customers;
    this.rowData =  customers      ;
  }

  private onFailure( attr, err ) {

    alert( ' error' + attr +  ': ' + err.toString());
  }

  private onCompleted(err) {

  }

  addCustomer() {
    // open modal window
    const modalRef = this.modalService.open(ModalWindowComponent);
    modalRef.componentInstance.customerData = new Customer();
    modalRef.result.then((data) => {
      // on close
      ;
    }, (reason) => {
      // on dismiss

      this.customerSevice.addCustomerHttp(reason).subscribe(this.onSaveSuccess.bind(this),
        this.onFailure.bind(this, 'add customer'),
        this.onCompleted.bind(this)
      );

    });

    // modalRef['save'] = this.save;
  }
  private onSaveSuccess(this) {
    this.customerSevice.getCustomersHttp().subscribe(this.onGetSuccess.bind(this),
      this.onFailure.bind(this, 'get customer'),
      this.onCompleted.bind(this)
    );

  }

  updateCustomer() {
    // open modal window
    const ngbModalOptions: NgbModalOptions = {
      backdrop : 'static',
      keyboard : false
    };
    const row = this.selectedRow;
    const modalRef = this.modalService.open(ModalWindowComponent, ngbModalOptions);
    modalRef.componentInstance.customerData = row.data;

    modalRef.result.then((data) => {
      // on close
    }, (reason) => {
      // on dismiss
      this.customerSevice.updateCustomerHttp( reason).subscribe(this.onSaveSuccess.bind(this),
        this.onFailure.bind(this, 'update customer'),
        this.onCompleted.bind(this)
      );
    });
  }

  deleteCustomer() {
    this.customerSevice.deletCustomerHttp(this.selectedRow.data.id).subscribe( sucess.bind(this), error.bind(this) );

    function sucess(attr) {
      this.customerSevice.getCustomersHttp().subscribe(this.onSaveSuccess.bind(this),
        this.onFailure.bind(this , 'delete customer'),
        this.onCompleted.bind(this)
      );
    }
    function error(err) {
      alert( ' error delete customer: ');
    }
  }

  onRowClicked(atr) {
    this.isSelected = true;
    this.selectedRow = atr;
    console.log(atr);
  }
}
