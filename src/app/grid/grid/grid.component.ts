import {Component, OnDestroy} from '@angular/core';
import {Store} from "@ngrx/store";
import {Product} from "../../api/Product";
import {BehaviorSubject} from "rxjs";
import {selectProducts} from "../store/gird.selector";
import {createProduct, loadProducts, removeProduct, updateProduct} from "../store/grid.actions";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

type STATE = 'GRID' | 'FORM';
type MODE = 'CREATE' | 'UPDATE';

@Component({
  selector: 'app-grid',
  templateUrl: './grid.component.html',
  styleUrls: ['./grid.component.scss']
})
export class GridComponent implements OnDestroy {
  state: STATE = 'GRID';
  formMode!: MODE;
  products$: BehaviorSubject<Product[]> = new BehaviorSubject([] as Product[]);
  form: FormGroup;

  constructor(private store: Store, private fb: FormBuilder) {
    this.store.select(selectProducts).subscribe(p => this.products$.next(p));
    this.store.dispatch(loadProducts());

    this.form = fb.group({
      id: [],
      name: ["", [Validators.required]],
      price: ["", [Validators.required, Validators.pattern(/^[0-9]*$/)]],
      description: [""],
    });
  }

  ngOnDestroy(): void {
    this.products$.unsubscribe();
  }

  changeView(state: STATE) {
    this.state = state;
  }

  remove(id: string) {
    this.store.dispatch(removeProduct({id: id}));
  }

  update(product: Product) {
    this.form.reset();
    this.form.patchValue(<any>product);
    this.formMode = "UPDATE";
    this.changeView('FORM');
  }

  create() {
    this.form.reset();
    this.formMode = "CREATE";
    this.changeView('FORM');
  }

  onSubmit() {
    let product: any = this.form.getRawValue();
    if (this.formMode === 'CREATE') {
      product.id = Math.random().toFixed(5);
      this.store.dispatch(createProduct({product}));
    } else {
      this.store.dispatch(updateProduct({product}));
    }

    this.changeView("GRID");
  }
}
