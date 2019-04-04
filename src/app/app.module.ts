import {NgModule} from '@angular/core';
import {CookieService, CookieModule} from '@gorniv/ngx-universal';
import {DatePipe} from '@angular/common';
import {HttpClientModule} from '@angular/common/http';
import {HttpModule} from '@angular/http';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';
import {AppComponent} from './app.component';
import {AppRoutingModule} from './app-routing.module';
import {LibModule} from './lib.module';
import {UniversalStorage} from '@lib/storage/universal.storage';

import {HeaderComponent} from '@_parts/header/header.component';
import {LoaderComponent} from '@_parts/loader/loader.component';
import {FooterComponent} from '@_parts/footer/footer.component';
import {ScrollTopComponent} from '@_parts/scroll-top/scroll-top.component';
import {LoaderService} from '@_parts/loader/services/loader/loader.service';
import {TransferHttpCacheModule} from '@nguniversal/common';
import {BrowserModule, BrowserTransferStateModule} from '@angular/platform-browser';
import {IndexPageComponent} from '@pages/index-page/index-page.component';
import {ErrorFormComponent} from '@lib/zform/_parts/error-form/error-form.component';
import {FormsModule} from '@angular/forms';
import {DatapickerModule} from './datapicker.module';
import {ZFormComponent} from '@lib/zform/zform.component';
import {ZFieldComponent} from '@lib/zform/zfield/zfield.component';
import {NotFoundPageComponent} from '@pages/not-found-page/not-found-page.component';
import {ModalComponent} from '@_parts/modal/modal.component';
import {SuccessFormComponent} from '@_parts/modal/_parts/success-form/success-form.component';
import { TopScreenComponent } from '@pages/index-page/_parts/top-screen/top-screen.component';
import {NgMasonryGridModule} from 'ng-masonry-grid';
import { ColumnItemComponent } from '@pages/index-page/_parts/column-item/column-item.component';
import { ModalPhotoViewComponent } from '@_parts/modal/_parts/modal-photo-view/modal-photo-view.component';

@NgModule({
    imports: [
        BrowserModule.withServerTransition({appId: 'my-app'}),
        NgMasonryGridModule,
        BrowserTransferStateModule,
        AppRoutingModule,
        TransferHttpCacheModule,
        HttpClientModule,
        HttpModule,
        RouterModule,
        CommonModule,
        BrowserAnimationsModule,
        CookieModule.forRoot(),
        LibModule.forRoot(),
        FormsModule,
        DatapickerModule
    ],
    declarations: [
        AppComponent,

        FooterComponent,
        HeaderComponent,
        LoaderComponent,
        ScrollTopComponent,
        LoaderComponent,
        ZFormComponent,
        ZFieldComponent,
        ErrorFormComponent,

        IndexPageComponent,
        NotFoundPageComponent,
        ModalComponent,
        SuccessFormComponent,
        TopScreenComponent,
        ColumnItemComponent,
        ModalPhotoViewComponent,
    ],
    providers: [
        CookieService,
        UniversalStorage,
        DatePipe,
        LoaderService,
    ],
    bootstrap: [AppComponent],
})
export class AppModule {
}
