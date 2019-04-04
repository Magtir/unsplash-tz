import {Injectable} from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class LoaderService {

    loader: boolean;

    constructor() {
        this.loader = false;
    }

    loaderOff() {
        setTimeout(() => {
            this.loader = false;
        }, 0);
    }
}
