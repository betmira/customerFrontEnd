export class Customer {
  id: number;
  name: string;
  surname: string;
  phone: string;
  address: string;
  //
  // constructor(attrs: {id?: number, name?: string, surname?: string, phone?: string, address?: string} = {}) {
  //   this.id = attrs.id;
  //   this.name = attrs.name;
  //   this.surname = attrs.surname;
  //   this.address = attrs.address;
  //   this.phone = attrs.phone;
  // }
  constructor(id?: number, name?: string, surname?: string,  address?: string, phone?: string) {
    this.id = id;
    this.name = name;
    this.surname = surname;
    this.address = address;
    this.phone = phone;
  }
}
