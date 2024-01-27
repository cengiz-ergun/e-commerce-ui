import { inject } from "@angular/core";
import { HttpRequest, HttpHandlerFn } from "@angular/common/http";
import { throwError } from "rxjs";
import { catchError } from "rxjs/operators";
import { HttpService } from "@app/_services/api/http.service";

export function errorInterceptor(request: HttpRequest<any>, next: HttpHandlerFn) {
    const httpService = inject(HttpService);
    return next(request).pipe(
        catchError((err) => {
            if ([401, 403].includes(err.status) && httpService.userValue) {
                // auto logout if 401 or 403 response returned from api
                httpService.logout();
            }

            const error = err.error?.message || err.statusText;
            console.error(err);
            return throwError(() => error);
        })
    );
}
