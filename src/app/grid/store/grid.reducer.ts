import {Action, createReducer, on} from '@ngrx/store';
import {Product} from "../../api/Product";
import {loadProductSuccess} from "./grid.actions";

export interface GridState {
  products: Product[];
}

export const initialState: GridState = {
  products: [],
};

export const gridFeatureKey = 'grid';

const _gridReducer = createReducer(
  initialState,
  on(loadProductSuccess, (s, {products}) => ({...s, products: products}))
);

export function gridReducer(state: GridState | undefined, action: Action) {
  return _gridReducer(state, action);
}
