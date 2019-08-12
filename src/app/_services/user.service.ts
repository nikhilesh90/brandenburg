import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { User } from '../_models';

@Injectable({ providedIn: 'root' })
export class UserService {
    constructor(private http: HttpClient) { }

    getAll() {
        return this.http.get<any>('http://dev-uas.iopbeta.com/brandenburg-iop-anana/api/v1/client');
    }

    register(user: User) {
        return this.http.post('http://dev-uas.iopbeta.com/brandenburg-iop-anana/api/v1/client', user);
    }

}
