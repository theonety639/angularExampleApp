import {
    Component, KeyValueDiffer, KeyValueDiffers, ChangeDetectorRef
} from "@angular/core";
import { Model } from "../model/repository.model";
@Component({
    selector: "paCategoryCount",
    template: `<div class="bg-primary p-2 text-white">
    There are {{count}} categories.
    </div>`
})
export class CategoryCountComponent {
    private differ: KeyValueDiffer<any, any>;
    count: number = 0;
    constructor(private model: Model,
        private keyValueDiffers: KeyValueDiffers,
        private changeDetector: ChangeDetectorRef) { }
    ngOnInit() {
        this.differ = this.keyValueDiffers
            .find(this.model.getProducts())
            .create();
    }
    ngDoCheck() {
        if (this.differ.diff(this.model.getProducts()) != null) {
            this.count = this.model.getProducts()
                .map(p => p.category)
                //The next line is a little complicated to understand.  There'll be an array of categories created by the previous map function.  Now, each one of the categories will be placed into category.  The index parameter will always increase by 1 with each iteration of the filter function.  The array parameter is just the array of categories, created by the previous map function.  Let's say there are cat1 and cat2.  cat1 is in indexes 0 and 1 of the array.  cat2 is in indexes 2, 3, and 4 of the array.  The goal is to create a new array of 2 elements only: cat1 in index 0 and cat2 in index 1.  So array.indexOf(cat1) will always return 0, it's always the first index where cat1 is.  Since in the first iteration, index = 0, it'll return the first element of the new array, where its 0 index has cat1.  In the second iteration of filter, cat1 still has indexOf 0, but index is 1 this time, so nothing will be returned.  In the 3rd iteration of the filter function, array.indexOf(category) will be 2 because it's the first index of the cat2 category.  Since index = 2 this time, it'll return cat2 in index 1 of the new array.  In the 4th and 5th iterations of filter, index will be 3 and 4 respectively, but array.indexOf(category) will always return 2 because it's the first index of cat2 in the array created by the previous map function.  So nothing will be returned.  If newArray is the new array created by the filter function, it's like this: newArray[0] = cat1, newArray[1] = cat2. 
                .filter((category, index, array) => array.indexOf(category) == index)
                .length;
        }
    }
}