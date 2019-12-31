import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ModelModule } from './model/model.module';
import { AppRoutingModule } from './app-routing.module';
import { CoreModule } from "./core/core.module";
import { MessageModule } from "./messages/message.module";
import { AppComponent } from './app.component';
import { TermsGuard } from "./terms.guard";
import { LoadGuard } from "./load.guard";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule, AppRoutingModule, ModelModule, CoreModule, MessageModule, BrowserAnimationsModule
  ],
  providers: [TermsGuard, LoadGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
