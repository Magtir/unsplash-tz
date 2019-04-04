import {Component, HostListener, OnInit} from '@angular/core';
import {ModalOpenService} from '@_parts/modal/services/modal-open/modal-open.service';
import {PhotoViewService} from '@services/photo-view/photo-view.service';
import {HelpService} from '@services/help/help.service';
import {UniversalStorage} from '@lib/storage/universal.storage';
import {HttpClient} from '@angular/common/http';

@Component({
    selector: 'app-modal-photo-view',
    templateUrl: './modal-photo-view.component.html',
    styleUrls: ['./modal-photo-view.component.less']
})
export class ModalPhotoViewComponent implements OnInit {

    modalOpen: string;
    image: any;

    constructor(public modalService: ModalOpenService,
                public photoViewService: PhotoViewService,
                public helpService: HelpService,
                private storage: UniversalStorage,
                private http: HttpClient,
    ) {
        this.modalService.modalOpen.subscribe(modalOpen => {
            this.modalOpen = modalOpen;
        });

        this.photoViewService.image.subscribe(image => {
            this.image = image;

            this.helpService.doIfExistElem('share-social', () => {
                const container = document.getElementById('share-social');
                const script = document.createElement('script');
                script.setAttribute('charset', 'utf-8');
                script.innerHTML = `
                        Ya.share2('share-social', {
                            theme: {
                                services: 'vkontakte',
                                size: 'm',
                            },
                            content: {
                                url: 'https://unsplash.com',
                                title: 'HD photo by ${this.image.user.name}',
                                image: '${this.image.urls.regular}'
                            },
                        });
                    `;
                container.appendChild(script);
            });
        });
    }

    @HostListener('document:keydown.escape', ['$event']) onKeydownHandler(event: KeyboardEvent) {
        this.modalService.close();
    }

    ngOnInit() {
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
