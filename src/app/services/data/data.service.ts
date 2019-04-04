import {Injectable} from '@angular/core';


@Injectable({providedIn: 'root'})

export class DataService {

    token: string;
    email: string;

    urlServerPictures: string;

    constructor() {
        this.token = '';
        this.email = '';

        this.urlServerPictures = 'https://vturs.synaptik.ru/uploads/';
    }

    login(token: string, email: string) {
        // localStorage.setItem('token', token);
        // localStorage.setItem('email', email);
        // this.token = token;
        // this.email = email;
        // $('.js-btn-close').trigger('click');
    }

    logout() {
        // localStorage.clear();
        // this.token = '';
        // this.email = '';
    }

    restore() {
        // this.email = localStorage.getItem('email') ? localStorage.getItem('email') : '';
        // this.token = localStorage.getItem('token') ? localStorage.getItem('token') : '';
    }
}
