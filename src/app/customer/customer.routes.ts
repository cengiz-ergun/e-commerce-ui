import { Routes } from "@angular/router";
import { LoginComponent } from "./pages/login/login.component";
import { RegisterComponent } from "./pages/register/register.component";
import { HomeComponent } from "./pages/home/home.component";
import { ShopComponent } from "./pages/shop/shop.component";
import { CartComponent } from "./pages/cart/cart.component";
import { CheckoutComponent } from "./pages/checkout/checkout.component";
import { customerGuard } from "@app/_models/guards/AuthGuard";

export const CUSTOMER_ROUTES: Routes = [
    { path: "", redirectTo: "home", pathMatch: "full" },
    { path: "home", component: HomeComponent },
    { path: "shop", component: ShopComponent },
    { path: "cart", component: CartComponent },
    { path: "checkout", component: CheckoutComponent, canActivate: [customerGuard] },
    { path: "login", component: LoginComponent },
    { path: "register", component: RegisterComponent },
];
