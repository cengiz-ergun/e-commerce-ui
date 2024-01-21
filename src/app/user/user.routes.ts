import { Routes } from "@angular/router";
import { AccountLoginComponent } from "./account-login/account-login.component";
import { AccountRegisterComponent } from "./account-register/account-register.component";
import { HomeComponent } from "./home/home.component";
// import { authGuard } from "@app/_helpers/auth.guard";
import { ShopComponent } from "./shop/shop.component";
import { CartComponent } from "./cart/cart.component";
import { CheckoutComponent } from "./checkout/checkout.component";
import { userGuard } from "@app/_helpers/user.guard";

export const USER_ROUTES: Routes = [
    { path: "", redirectTo: "home", pathMatch: "full" },
    { path: "home", component: HomeComponent },
    { path: "shop", component: ShopComponent },
    { path: "cart", component: CartComponent },
    { path: "checkout", component: CheckoutComponent, canActivate: [userGuard] },
    { path: "login", component: AccountLoginComponent },
    { path: "register", component: AccountRegisterComponent },
];
