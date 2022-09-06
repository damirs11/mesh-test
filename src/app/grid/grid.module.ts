import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {GridComponent} from './grid/grid.component';
import {StoreModule} from "@ngrx/store";
import {gridFeatureKey, gridReducer} from "./store/grid.reducer";
import {EffectsModule} from "@ngrx/effects";
import {GridEffect} from "./store/gird.effect";
import {ReactiveFormsModule} from "@angular/forms";


@NgModule({
  declarations: [
    GridComponent
  ],
  exports: [
    GridComponent
  ],
  imports: [
    CommonModule,
    StoreModule.forFeature(gridFeatureKey, gridReducer),
    EffectsModule.forFeature([GridEffect]),
    ReactiveFormsModule,
  ]
})
export class GridModule {
}
