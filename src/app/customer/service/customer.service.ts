import { Injectable } from '@angular/core';
// import {Http, RequestOptions} from '@angular/common/http';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {Customer} from '../model/customer';
import {SERVER_API_URL} from '../../app.constants';


import { map } from 'rxjs/operators';

@Injectable()
export class CustomerService { private getCustomerSucess: any;

  // private  _headers =  {
  //   headers: new HttpHeaders().set('Content-Type', 'application/json')
  // };
  //
  // private headers={
  //   headers: new HttpHeaders({
  //     'Content-Type': 'application/json'
  //   })
  // }

  private apiName  = 'customers/' ;

  constructor(private http: HttpClient) { }

  getCustomersHttp(queries?: object): Observable<Customer> {

    // let queryString=''
    // if(queries.page>0 && queries.query != '' && )
    // { params: queries}

    return this.http.get<Customer[]>(SERVER_API_URL + this.apiName ).pipe(map(getSuccess.bind(this), getSuccess.bind(this)));

    function getSuccess(resp) {
     // debugger;
     // return JSON.parse(resp);

     //this.addUserHttp(JSON.parse(resp._body)[0]);
      return resp.map(item => {
        return new Customer(
          item.ID,
          item.Name,
          item.Surname,
          item.Address,
          item.Phone
        );
      });

          }
  }
 addCustomerHttp(user) {
   return this.http.post(SERVER_API_URL + this.apiName , user ).pipe(map(addCustomerSucess.bind(this)));

   function addCustomerSucess(resp) {
     return new Customer(resp);
   }
 }

 deletCustomerHttp(id): Observable<object> {
   return this.http.delete( SERVER_API_URL + this.apiName + id);
 }

  updateCustomerHttp(data: Customer) {
    return this.http.put(SERVER_API_URL + this.apiName + data.id, data ).pipe(map(updateCustomerSucess.bind(this)));

    function updateCustomerSucess(resp) {
      return resp;
    }
  }
}


