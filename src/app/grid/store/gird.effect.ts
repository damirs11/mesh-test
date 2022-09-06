import {Injectable} from "@angular/core";
import {Store} from "@ngrx/store";
import {Actions, createEffect, ofType} from "@ngrx/effects";
import {map, switchMap} from "rxjs";
import {ProductService} from "../../service/product.service";
import {
  createProduct,
  createProductSuccess,
  loadProducts,
  loadProductSuccess,
  removeProduct,
  removeProductSuccess,
  updateProduct,
  updateProductSuccess
} from "./grid.actions";

@Injectable()
export class GridEffect {
  constructor(
    private actions$: Actions,
    private productService: ProductService,
    private store: Store,
  ) {
  }

  loadProducts$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(loadProducts),
      switchMap(() => {
        return this.productService.getAll().pipe(
          map((res) => {
            return loadProductSuccess({products: res});
          })
        );
      })
    );
  });

  saveProduct$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(createProduct),
      switchMap((actions) => {
        return this.productService.create(actions.product).pipe(
          map(() => {
            this.store.dispatch(loadProducts());
            return createProductSuccess()
          })
        );
      })
    );
  });

  updateProduct$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(updateProduct),
      switchMap((actions) => {
        return this.productService.edit(actions.product).pipe(
          map(() => {
            this.store.dispatch(loadProducts());
            return updateProductSuccess()
          })
        );
      })
    );
  });

  removeProduct$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(removeProduct),
      switchMap((actions) => {
        return this.productService.remove(actions.id).pipe(
          map(() => {
            this.store.dispatch(loadProducts());
            return removeProductSuccess()
          })
        );
      })
    );
  });
}
