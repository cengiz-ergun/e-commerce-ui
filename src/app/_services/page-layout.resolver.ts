import { inject } from "@angular/core";
import { ActivatedRouteSnapshot, ResolveFn, RouterStateSnapshot } from "@angular/router";
import { PageLayout } from "@app/_models/page-layout";
import { PageLayoutService } from "./page-layout.service";

export const setLayout = (inputLayout: PageLayout): ResolveFn<void> => {
    // eslint-disable-next-line
    return (_route: ActivatedRouteSnapshot, _state: RouterStateSnapshot) => {
        inject(PageLayoutService).setLayout(inputLayout);
    };
};
