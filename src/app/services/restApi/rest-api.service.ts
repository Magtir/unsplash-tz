import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';

const API_URL = 'https://api.unsplash.com';
const token = 'b42ae75a76c64a05dc6eb9b41a53bcc6a86be67690f7c6cae8b934b079cfa52c';

@Injectable({providedIn: 'root'})
export class RestApiService {
    pathPageIndex = '/controller/index-page';

    constructor(private http: HttpClient) {
    }

    getHeaders() {
        return token
            ? new HttpHeaders().set('Authorization', 'Client-ID ' + token)
            : null;
    }

    ///////////////
    // Принимает 1)путь апишки, 2)калбэк, который будет обрабатывать ответ
    get(url: string, callback: any) {
        this.http
            .get(`${API_URL + url}`, {
                headers: this.getHeaders()
            })
            .toPromise()
            .then(
                (res: any) => {
                    callback(res);
                },
                err => {
                    console.log(err.message ? err.message : err);
                    callback(null);
                }
            );
    }

    post(url: string, body: any, callback: any) {
        this.http
            .post(`${API_URL + url}`, body, {
                headers: this.getHeaders()
            })
            .toPromise()
            .then(
                (res: any) => {
                    callback(res);
                },
                err => {
                    console.log(err.message ? err.message : err);
                    callback(null);
                }
            );
    }
}
