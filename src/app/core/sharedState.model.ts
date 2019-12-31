import { InjectionToken, ElementRef } from "@angular/core";

export enum MODES {
    CREATE, EDIT
}

/*This is a service.  What makes a service a service in angular is the class being inserted into ANY providers property of @NgModule.  I just need to decorate a service with @Injectable if the service itself needs to be injected with other services.  If SharedState depended on HttpService in its constructor, for example, and I didn't use the @Injectable decorator, the code wouldn't compile.  This happens because browsers don't understand typescript.  Typescript has to be translated into javascript (ECMAScript) for the browser to understand, and javascript doesn't know the difference between the types SharedState and HttpService, for example.  In javascript,they're all of type object, unless you manually write a javascript code that uses the instanceof operator.

The problem now is that I changed the providers property in the core.module.ts @NgModule decorator, so now I don't know if SharedState is still considered a service.  I don't think it's a service anymore because services are singleton, and in table.component.ts, new instances of SharedState are being created everytime somebody clicks the create or edit buttons.*/
export class SharedState {

    constructor(public mode: MODES, public id?: number) { }
}

export const SHARED_STATE = new InjectionToken("shared_state");
