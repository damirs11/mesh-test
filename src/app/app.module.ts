import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppComponent} from './app.component';
import {StoreModule} from '@ngrx/store';
import {ENVIRONMENT} from "./service/environment.service";
import {environment} from "../environments/environment";
import {GridModule} from "./grid/grid.module";
import {StoreDevtoolsModule} from "@ngrx/store-devtools";
import {EffectsModule} from "@ngrx/effects";
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {ProductHttpMockerService} from "./interceptors/product-http-mocker.service";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,

    StoreModule.forRoot({}),
    EffectsModule.forRoot(),
    StoreDevtoolsModule.instrument(),

    GridModule,
  ],
  providers: [
    {provide: ENVIRONMENT, useValue: environment},
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ProductHttpMockerService,
      multi: true
    }],
  exports: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
