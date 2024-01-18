/// <reference types="@angular/localize" />

import { bootstrapApplication } from "@angular/platform-browser";
// import { appConfig } from "./app/app.config";
import { AppComponent } from "./app/app.component";
import {
    InMemoryScrollingFeature,
    InMemoryScrollingOptions,
    provideRouter,
    withInMemoryScrolling,
} from "@angular/router";
import { routes } from "./app/app.routes";
import { provideHttpClient, withInterceptors } from "@angular/common/http";
import { mockBackendInterceptor } from "./app/_helpers/mock-backend";
import { jwtInterceptor } from "@app/_helpers/jwt.interceptor";
import { errorInterceptor } from "@app/_helpers/error.interceptor";

// bootstrapApplication(AppComponent, appConfig).catch((err) => console.error(err));

const scrollConfig: InMemoryScrollingOptions = {
    scrollPositionRestoration: "top",
    anchorScrolling: "enabled",
};

const inMemoryScrollingFeature: InMemoryScrollingFeature = withInMemoryScrolling(scrollConfig);

bootstrapApplication(AppComponent, {
    providers: [
        // provideRouter(routes),
        provideRouter(routes, inMemoryScrollingFeature),
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
