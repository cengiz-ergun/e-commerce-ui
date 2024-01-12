/// <reference types="@angular/localize" />

import { bootstrapApplication } from "@angular/platform-browser";
// import { appConfig } from "./app/app.config";
import { AppComponent } from "./app/app.component";
import { provideRouter } from "@angular/router";
import { routes } from "./app/app.routes";
import { provideHttpClient, withInterceptors } from "@angular/common/http";
import { mockBackendInterceptor } from "./app/_helpers/mock-backend";
import { jwtInterceptor } from "@app/_helpers/jwt.interceptor";
import { errorInterceptor } from "@app/_helpers/error.interceptor";

// bootstrapApplication(AppComponent, appConfig).catch((err) => console.error(err));

bootstrapApplication(AppComponent, {
    providers: [
        provideRouter(routes),
        provideHttpClient(
            withInterceptors([
                jwtInterceptor,
                errorInterceptor,

                // mock backend
                mockBackendInterceptor,
            ])
        ),
    ],
});
