export class Address {
    address1: string;
    address2: string;
    city: string;
    street: string;
    state: string;
    country: string;
    pinCode: number;
}
export class User {
    id?: number;
    name: string;
    token?: string;
    address?: Address;
}
