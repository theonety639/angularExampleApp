import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FormComponent } from './core/form.component';
import { TableComponent } from './core/table.component';
import { NotFoundComponent } from "./core/notFound.component";
import { ProductCountComponent } from "./core/productCount.component";
import { CategoryCountComponent } from "./core/categoryCount.component";
import { ModelResolver } from "./model/model.resolver";
import { TermsGuard } from "./terms.guard"
import { UnsavedGuard } from "./core/unsaved.guard";
import { LoadGuard } from "./load.guard";

const childRoutes: Routes = [
  {
    path: "",
    canActivate: [TermsGuard],
    children: [
      { path: "products", component: ProductCountComponent },
      { path: "categories", component: CategoryCountComponent },
      { path: "", component: ProductCountComponent }],
    resolve: { model: ModelResolver }
  }];

const routes: Routes = [
  {
    path: "ondemand",
    loadChildren: "./ondemand/ondemand.module#OnDemandModule",
    canLoad: [LoadGuard]
  },

  { path: "form/:mode/:id", component: FormComponent, resolve: { model: ModelResolver }, canDeactivate: [UnsavedGuard] },

  { path: "form/:mode", component: FormComponent, resolve: { model: ModelResolver }, canActivate: [TermsGuard] },

  { path: "does", redirectTo: "/form/create", pathMatch: "prefix" },
  /*it used to be this way up to page 673.  Then it changed, creating a variable for children of table because this variable has to be accessed from the path table and table/:category so that the children have access to the category parameter of their parent, which is table.
  {
    path: "table",
    component: TableComponent,
    children: [
      { path: "products", component: ProductCountComponent },
      { path: "categories", component: CategoryCountComponent }
    ]
  },
  { path: "table/:category", component: TableComponent },
  { path: "table", component: TableComponent },*/

  /*When passing params to the child, the order of paths declared in this file has to be from less specific to more specific, so the next two lines have to be in this order.  Switching them and calling a url like table/categories will match table/0/categories and CategoryCountComponent will say there are 0 categories, which isn't true.*/

  { path: "table", component: TableComponent, children: childRoutes },

  { path: "table/:category", component: TableComponent, children: childRoutes },

  { path: "", redirectTo: "/table", pathMatch: "full" },

  { path: "**", component: NotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
