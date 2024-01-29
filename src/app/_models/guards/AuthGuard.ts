import { inject } from "@angular/core";
import { Router, ActivatedRouteSnapshot, RouterStateSnapshot } from "@angular/router";
import { Role } from "@app/_models/enums/role";
import { HttpService } from "@app/_services/api/http.service";

class AuthGuard {
    constructor(
        private router: Router,
        private httpService: HttpService
    ) {}

    authorizeUser(allowedRole: Role, state: RouterStateSnapshot): boolean {
        const user = this.httpService.userValue;
        if (user && user.role === allowedRole) {
            // authorized, return true
            return true;
        } else if (user) {
            this.router.navigate(["/forbidden"], { queryParams: { returnUrl: state.url } });
            return false;
        }

        // not logged in or unauthorized, redirect to login page with the return url
        this.router.navigate(["/login"], { queryParams: { returnUrl: state.url } });
        return false;
    }
}

export function adminGuard(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const authGuard = new AuthGuard(inject(Router), inject(HttpService));
    return authGuard.authorizeUser(Role.Admin, state);
}

export function customerGuard(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const authGuard = new AuthGuard(inject(Router), inject(HttpService));
    return authGuard.authorizeUser(Role.Customer, state);
}
