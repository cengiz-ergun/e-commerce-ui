import { Routes } from "@angular/router";
import { AccountLoginComponent } from "./account-login/account-login.component";
import { AccountRegisterComponent } from "./account-register/account-register.component";
import { HomeComponent } from "./home/home.component";
import { authGuard } from "@app/_helpers/auth.guard";

export const USER_ROUTES: Routes = [
    { path: "", redirectTo: "home", pathMatch: "full" },
    { path: "home", component: HomeComponent, canActivate: [authGuard] },
    { path: "login", component: AccountLoginComponent },
    { path: "register", component: AccountRegisterComponent },
];
