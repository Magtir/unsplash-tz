import {NgModule} from '@angular/core';
import {BrowserTransferStateModule} from '@angular/platform-browser';
import {REQUEST} from '@nguniversal/express-engine/tokens';
import {AppComponent} from './app.component';
import {AppModule} from './app.module';
import {InlineStyleComponent} from './components/lib/inline-style/inline-style.component';
import {InlineStyleModule} from './components/lib/inline-style/inline-style.module';
import {StateTransferInitializerModule} from '@nguniversal/common';
import {ServiceWorkerModule} from '@angular/service-worker';

// the Request object only lives on the server
export function getRequest(): any {
    return {headers: {cookie: document.cookie}};
}

@NgModule({
    imports: [
        AppModule,
        StateTransferInitializerModule,
        BrowserTransferStateModule,
        InlineStyleModule,
        ServiceWorkerModule.register('/ngsw-worker.js', {enabled: false}),
    ],
    providers: [
        {
            // The server provides these in main.server
            provide: REQUEST,
            useFactory: getRequest,
        },
        {provide: 'ORIGIN_URL', useValue: location.origin},
    ],
    bootstrap: [AppComponent, InlineStyleComponent],
})
export class AppBrowserModule {
}
