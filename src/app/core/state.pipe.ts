import { Pipe } from "@angular/core";
import { SharedState, MODES } from "./sharedState.model";
import { Model } from "../model/repository.model";
@Pipe({
    name: "formatState",
    pure: true
})
export class StatePipe {
    constructor(private model: Model) { }
    transform(value: any): string {
        if (value instanceof SharedState) {
            let state = value as SharedState;
            return "My pipe says " + MODES[state.mode] + (state.id != undefined
                ? ` ${this.model.getProduct(state.id).name} of ID ${state.id}.` : " some new product.");
        } else {
            return "My pipe says <No Data>"
        }
    }
}