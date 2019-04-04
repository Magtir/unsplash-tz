import {Component, OnInit} from '@angular/core';
import {ModalOpenService} from '@_parts/modal/services/modal-open/modal-open.service';

@Component({
    selector: 'app-modal',
    templateUrl: './modal.component.html'
})
export class ModalComponent implements OnInit {

    modalOpen: string;

    constructor(public modalService: ModalOpenService) {
        this.modalService.modalOpen.subscribe(modalOpen => {
            this.modalOpen = modalOpen;

            if (modalOpen) {
                document.querySelector('body').style.overflow = 'hidden';
            } else {
                document.querySelector('body').style.overflow = '';
            }
        });
    }

    ngOnInit() {
    }
}
