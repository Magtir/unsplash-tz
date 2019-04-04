import {Component, OnInit} from '@angular/core';
import {ModalOpenService} from '@_parts/modal/services/modal-open/modal-open.service';

@Component({
    selector: 'app-success-form',
    templateUrl: './success-form.component.html'
})
export class SuccessFormComponent implements OnInit {

    modalOpen: string;
    text: string;
    timer: any;

    constructor(public modalService: ModalOpenService,
    ) {
        this.modalService.modalOpen.subscribe(modalOpen => {
            this.modalOpen = modalOpen;
        });

        this.modalService.textSuccess.subscribe(text => {
            // this.modalService.close();
            this.modalService.open(this.modalService.modalSuccess);
            this.text = text;
            clearTimeout(this.timer);
            this.timer = setTimeout(() => {
                this.modalService.close();
            }, 2000);
        });
    }

    ngOnInit() {
    }

}
