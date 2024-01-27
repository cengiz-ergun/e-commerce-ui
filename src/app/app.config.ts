import { ApplicationConfig } from "@angular/core";
import {
    InMemoryScrollingFeature,
    InMemoryScrollingOptions,
    provideRouter,
    withInMemoryScrolling,
} from "@angular/router";
import { routes } from "./app.routes";
import { provideHttpClient, withInterceptors } from "@angular/common/http";
import { mockBackendInterceptor } from "./_helpers/mock-backend";
import { jwtInterceptor } from "@app/_helpers/jwt.interceptor";
import { errorInterceptor } from "@app/_helpers/error.interceptor";
import { provideAnimations } from "@angular/platform-browser/animations";
import { provideToastr } from "ngx-toastr";

const scrollConfig: InMemoryScrollingOptions = {
    scrollPositionRestoration: "top",
    anchorScrolling: "enabled",
};

const inMemoryScrollingFeature: InMemoryScrollingFeature = withInMemoryScrolling(scrollConfig);

export const appConfig: ApplicationConfig = {
    providers: [
        provideRouter(routes, inMemoryScrollingFeature),
        provideHttpClient(
            withInterceptors([
                jwtInterceptor,
                errorInterceptor,

                // mock backend
                mockBackendInterceptor,
            ])
        ),

        provideAnimations(),
        provideToastr(),
    ],
};
