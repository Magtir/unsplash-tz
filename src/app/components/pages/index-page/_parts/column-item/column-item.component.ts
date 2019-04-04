import {Component, Input, OnInit} from '@angular/core';
import {ModalOpenService} from '@_parts/modal/services/modal-open/modal-open.service';
import {PhotoViewService} from '@services/photo-view/photo-view.service';
import {UniversalStorage} from '@lib/storage/universal.storage';
import {HttpClient} from '@angular/common/http';

@Component({
    selector: 'app-column-item',
    templateUrl: './column-item.component.html',
    styleUrls: ['./column-item.component.less']
})
export class ColumnItemComponent implements OnInit {

    @Input() listItems = [];
    @Input() className: string;

    constructor(private modalService: ModalOpenService,
                private photoViewService: PhotoViewService,
                private storage: UniversalStorage,
                private http: HttpClient,
    ) {
    }

    ngOnInit() {
    }

    view(image) {
        this.modalService.open(this.modalService.modalPhotoView);
        this.photoViewService.setImage(image);
    }

    like(img: any) {
        if (!this.storage.getItem(img.id)) {
            this.storage.setItem(img.id, img.id);
            img.liked_by_user = true;
            img.likes++;
        } else {
            this.storage.removeItem(img.id);
            img.liked_by_user = false;
            img.likes--;
        }
    }

    download(urlImage: string, id: string) {
        this.http.get(urlImage, { responseType: 'blob' }).subscribe(val => {
            const url = URL.createObjectURL(val);

            const a: any = document.createElement('a');
            a.href = url;
            a.download = id;
            document.body.appendChild(a);
            a.style = 'display: none';
            a.click();
            a.remove();

            URL.revokeObjectURL(url);
        });
    }
}
