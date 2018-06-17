import {Component,  Input, OnInit,} from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, FormBuilder,  Validators  } from '@angular/forms';
import {Customer} from '../model/customer';

@Component({
  selector: 'app-modal-window',
  templateUrl: './modal-window.component.html',
  styleUrls: ['./modal-window.component.scss']
})
export class ModalWindowComponent implements OnInit {

  @Input() customerData;
  customerForm: FormGroup;

  constructor(public activeModal: NgbActiveModal, private fb: FormBuilder) {}

  ngOnInit() {
    this.customerForm = this.fb.group({
      'name': [this.customerData.name, Validators.compose([Validators.required, Validators.minLength(2)])],
      'surname': [this.customerData.surname, Validators.compose([Validators.required, Validators.minLength(2)])],
      'address': [this.customerData.address],
      'phone': [this.customerData.phone]
    });
  }
    getData(){
      return new Customer( this.customerData.id, this.customerForm.value.name, this.customerForm.value.surname, this.customerForm.value.address,this.customerForm.value.phone);

  }


}
