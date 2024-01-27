import { inject } from "@angular/core";
import { HttpRequest, HttpHandlerFn } from "@angular/common/http";

import { environment } from "@environments/environment";
import { HttpService } from "@app/_services/api/http.service";

export function jwtInterceptor(request: HttpRequest<any>, next: HttpHandlerFn) {
    // add auth header with jwt if user is logged in and request is to the api url
    const httpService = inject(HttpService);
    const user = httpService.userValue;
    const isLoggedIn = user?.token;
    const isApiUrl = request.url.startsWith(environment.apiUrl);
    if (isLoggedIn && isApiUrl) {
        request = request.clone({
            setHeaders: { Authorization: `Bearer ${user.token}` },
        });
    }

    return next(request);
}
