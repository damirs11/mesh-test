import {createAction, props} from "@ngrx/store";
import {Product} from "../../api/Product";

export const loadProducts = createAction(
  '[Product] loadProduct'
);

export const loadProductSuccess = createAction(
  '[Product] loadProduct Success',
  props<{ products: Product[] }>()
);

export const updateProduct = createAction(
  '[Product] updateProduct',
  props<{ product: Product }>()
);

export const updateProductSuccess = createAction(
  '[Product] updateProduct Success'
);

export const removeProduct = createAction(
  '[Product] removeProduct',
  props<{ id: string }>()
);

export const removeProductSuccess = createAction(
  '[Product] removeProduct Success'
);

export const createProduct = createAction(
  '[Product] createProduct',
  props<{ product: Product }>()
);

export const createProductSuccess = createAction(
  '[Product] createProduct Success'
);
