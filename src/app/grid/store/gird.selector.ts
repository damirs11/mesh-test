import {createFeatureSelector, createSelector} from "@ngrx/store";
import {gridFeatureKey, GridState} from "./grid.reducer";

export const selectGrid = createFeatureSelector<GridState>(gridFeatureKey);

export const selectProducts = createSelector(selectGrid, (grid) => grid.products);

export const selectProductById = (productId: string) => createSelector(selectProducts, (products) => products.find(p => p.id === productId))
