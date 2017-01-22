import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { ArticleComponent } from './article/article.component';
import { AboutComponent } from './about/about.component';
import { HomeComponent } from './home/home.component';
import { APP_ROUTES } from './app.routes';
import { ProductsComponent } from './products/products.component';
import { ProductComponent } from './product/product.component';
import { QuantityFilterPipe } from './quantity-filter.pipe';
import { PopupComponent } from './popup/popup.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [
    AppComponent,
    ArticleComponent,
    AboutComponent,
    HomeComponent,
    ProductsComponent,
    ProductComponent,
    QuantityFilterPipe,
    PopupComponent
  ],
  imports: [
    RouterModule.forRoot(APP_ROUTES),
    NgbModule.forRoot(),
    BrowserModule,
    FormsModule,
    HttpModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
