import {EventEmitter, Injectable} from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class ModalOpenService {
    modalSuccess = 'success';
    modalPhotoView = 'photo-view';

    modalOpen: EventEmitter<string>;
    textSuccess: EventEmitter<string>;

    constructor() {
        this.modalOpen = new EventEmitter();
        this.textSuccess = new EventEmitter();
    }

    open(modalOpen: string) {
        this.modalOpen.emit(modalOpen);
    }

    close() {
        this.modalOpen.emit('');
    }

    setTextSuccess(text: string) {
        this.textSuccess.emit(text);
    }
}
