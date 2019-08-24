import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatMenuModule} from '@angular/material/menu';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import { RouterModule, Routes } from '@angular/router';





import { AppComponent } from './app.component';
import { SellCarComponent } from './sell-car/sell-car.component';
import { BuyCarComponent } from './buy-car/buy-car.component';
import { NavbarComponent } from './navbar/navbar.component';
import { HomeComponent } from './home/home.component';

const appRoutes: Routes = [
  { path: 'buy',
    component: BuyCarComponent
  },
  { path: 'sell',
    component: SellCarComponent
  },
  { path: '',
    component: HomeComponent
  }
];

@NgModule({
  declarations: [
    AppComponent,
    SellCarComponent,
    BuyCarComponent,
    NavbarComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatMenuModule,
    MatToolbarModule,
    MatCardModule,
    MatButtonModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
