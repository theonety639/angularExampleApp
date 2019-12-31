import { Component, AfterViewInit, Inject, ViewChild, ElementRef } from "@angular/core";
import { NgForm } from "@angular/forms";
import { Product } from "../model/product.model";
import { Model } from "../model/repository.model"
import { ActivatedRoute, Router } from "@angular/router";

/*I think this is a template-based form because I can't see any form of formControl type of stuff.  Besides all the validation is being done on the template, like the regular expression at the price field.*/
@Component({
    selector: "paForm",
    templateUrl: "form.component.html",
    styleUrls: ["form.component.css"]
})
export class FormComponent implements AfterViewInit {
    @ViewChild('myFocusElement', { static: false }) focusElement: ElementRef;
    product: Product = new Product();
    originalProduct = new Product();
    editing: boolean = false;

    /*This was the constructor up to page 620 of the Pro angular 6 book
    constructor(private model: Model, @Inject(SHARED_STATE) private stateEvents: Observable<SharedState>) {
        /*To see how to use pipe, filter, map with rxjs, look at the examples from page 582 to 586.
        Basically, filter, map and other of these operators can be called directly from an array.  However, stateEvents is an observable, so use pipe and inside the pipe, use map.  Then if I still wanna chain filter together, gotta call pipe again, and inside this new pipe, call filter.  distinctUntilChanged() can be seen on pages 587 - 589.  I chose not to use it, because every time somebody clicks the edit button, I want the values of the fields to go back to what they were after being saved for the last time.  skipWhile and takeWhile operators can also be used.  They're easy to use and the explanation is on the following pages.
        stateEvents.subscribe(update => {
            //It creates a new product every time there's an event because if it's a create event after an edit event, the form won't erase.
            this.product = new Product();

            if (update.id != undefined) {
                Object.assign(this.product, this.model.getProduct(update.id));
            }
            this.editing = update.mode == MODES.EDIT;
        });
    }*/

    constructor(private model: Model, private activatedRoute: ActivatedRoute, private router: Router) {
        //Below it works if it's /form/create and /form/edit in app-routing.module.ts
        //this.editing = activatedRoute.snapshot.url[1].path == "edit";

        /*This block represents the 2nd change done by the book, overwritten by the 3rd change on page 663.
        this.editing = activatedRoute.snapshot.params["mode"] == "edit";
        let id = activatedRoute.snapshot.params["id"];*/

        //This works, but the book keeps changing things, it's a pain and unnecessary.
        /*if (id != null) {
            let name = activatedRoute.snapshot.params["name"];
            let category = activatedRoute.snapshot.params["id"];
            let price = activatedRoute.snapshot.params["price"];
            if (name != null && category != null && price != null) {
                this.product.id = id;
                this.product.name = name;
                this.product.category = category;
                this.product.price = Number.parseFloat(price);
            } else {
                Object.assign(this.product, model.getProduct(id) || new Product());
            }
        }*/

        /*This block also represents the 2nd change, overwritten by the 3rd change on page 663.
        if(id!=null) {
            Object.assign(this.product, model.getProduct(id) || new Product());
        }*/

        /*The code below is the 3rd change, written on page 663.  Its difference, to the 2nd version of it, is that the 2nd represents a snapshot of the URL.  Going into localhost:4200/edit/2, for example, the first time from the application, not by typing it in the address bar, it loads the product whose Id is 2 in the form.  However, when using the buttons forward or backward on the same page to load the next or previous product, it doesn't load it on the form because I'm inside the constructor here, which is run once when the FormComponent class is instantiated.  It won't be instantiated again before leaving this page and going some place else, and then coming back to this page.  So instead of using activatedRoute.snapshot.params, use activatedRoute.params.subscribe to receive notifications whenever the adress bar URL changes, even if I didn't leave the page.  This will load the next and previous products.*/
        activatedRoute.params.subscribe(params => {
            this.editing = params["mode"] == "edit";
            let id = params["id"];
            if (id != null) {
                Object.assign(this.product, model.getProduct(id) || new Product());
                Object.assign(this.originalProduct, this.product);
            }
        })
    }

    ngAfterViewInit() {
        this.focusElement.nativeElement.focus();

        //this will make the execution after something above has changed
        /*setTimeout(()=>{this.focusElement.nativeElement.focus();},0);*/
    }

    submitForm(form: NgForm) {
        if (form.valid) {
            this.model.saveProduct(this.product);
            this.originalProduct = this.product;
            /*This was used up to page 620 of the Pro angular 6 book.
            this.product = new Product();
            form.reset();*/
            this.router.navigateByUrl('/');
        }
    }

    /*This was taken out on page 696.
    resetForm() {
        this.product = new Product();
    }*/
}