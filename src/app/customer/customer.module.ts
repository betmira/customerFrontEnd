import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomerComponent } from './customer.component';
import {AgGridModule} from 'ag-grid-angular';
import { ModalWindowComponent } from './modal-window/modal-window.component';
import { NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';

@NgModule({
  imports: [
    CommonModule,
    AgGridModule.withComponents([/*optional Angular Components to be used in the grid*/]),
    NgbModule.forRoot(),
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  declarations: [CustomerComponent, ModalWindowComponent],
  exports: [CustomerComponent],
  entryComponents: [ModalWindowComponent]
})
export class CustomerModule { }
