import { NgModule } from "@angular/core";
//this is not used anymore, after rest.datasource is used.
//import { StaticDataSource } from "./static.datasource";
import { Model } from "./repository.model";
import { HttpClientModule } from "@angular/common/http";
import { RestDataSource, REST_URL } from './rest.datasource';
import { ModelResolver } from "./model.resolver";

@NgModule({
    imports: [HttpClientModule],
    providers: [
        Model, RestDataSource,
        {provide: REST_URL, useValue: `http://${location.hostname}:3500/products`},
        ModelResolver
    ]
})
export class ModelModule { }