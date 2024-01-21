import { inject } from "@angular/core";
import { Router, ActivatedRouteSnapshot, RouterStateSnapshot } from "@angular/router";
import { Role } from "@app/_models/enums/role";
import { AccountService } from "@app/_services/account.service";

export function adminGuard(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const router = inject(Router);
    const accountService = inject(AccountService);
    const user = accountService.userValue;
    if (user && user.role === Role.admin) {
        // authorised so return true
        return true;
    }

    // not logged in so redirect to login page with the return url
    router.navigate(["/login"], { queryParams: { returnUrl: state.url } });
    return false;
}
