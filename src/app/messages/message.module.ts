import { NgModule, ErrorHandler } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { MessageComponent } from "./message.component";
import { MessageService } from "./message.service";
import { MessageErrorHandler } from "./errorHandler";
import { RouterModule } from '@angular/router';
/*Importing the RouterModule isn't required for the application because it's already imported by the CoreModule, which is imported by the app.module.ts file, but it's good practice to import all the modules a certain component (in this case, MessageComponent) needs.  There's a lot of redundancy in importing modules in angular.*/

@NgModule({
    imports: [BrowserModule, RouterModule],
    declarations: [MessageComponent],
    exports: [MessageComponent],
    providers: [
        MessageService,
        { provide: ErrorHandler, useClass: MessageErrorHandler }
    ]
})
export class MessageModule { }