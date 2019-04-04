import {EventEmitter, Injectable} from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class PhotoViewService {

    image: EventEmitter<any>;
    constructor() {
        this.image = new EventEmitter();
    }

    setImage(image: any) {
        this.image.emit(image);
    }
}
