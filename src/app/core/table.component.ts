import { Component, Inject } from "@angular/core";
import { Product } from "../model/product.model";
import { Model } from "../model/repository.model";
//import { MODES, SharedState, SHARED_STATE } from "./sharedState.model";
//import { Observer } from "rxjs";
import { MessageService } from '../messages/message.service';
import { ActivatedRoute } from '@angular/router';
import { HighlightTrigger } from "./table.animations";

@Component({
    selector: "paTable",
    templateUrl: "table.component.html",
    animations: [HighlightTrigger]
})
export class TableComponent {
    category: string = null;
    highlightCategory: string = "";

    constructor(private model: Model, /*@Inject(SHARED_STATE) private observer: Observer<SharedState>,*/ private ms: MessageService, activatedRoute: ActivatedRoute) {
        activatedRoute.params.subscribe(params => {
            this.category = params["category"] || null;
        })
    }

    getProduct(key: number): Product {
        return this.model.getProduct(key);
    }

    getProducts(): Product[] {
        return this.model.getProducts().filter(p => this.category == null || p.category == this.category);
    }

    deleteProduct(key: number) {
        this.model.deleteProduct(key);
        this.ms.reportMessage(null);
    }

    get categories(): string[] {
        return this.model.getProducts()
            .map(p => p.category)
            .filter((category, index, array) => array.indexOf(category) == index);
    }

    
    getRowState(category: string): string {
        return this.highlightCategory == "" ? "" :
            this.highlightCategory == category ? "selected" : "notselected";
    }

    /*These used to be called up to page 620, but they're no longer needed ever since routing came into play in the app-routing.module.ts file.
    editProduct(key: number) {
        this.observer.next(new SharedState(MODES.EDIT, key));
    }

    createProduct() {
        this.observer.next(new SharedState(MODES.CREATE));
    }*/
}