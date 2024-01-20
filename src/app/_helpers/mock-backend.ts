import { HttpRequest, HttpResponse, HttpHandlerFn } from "@angular/common/http";
import { of, throwError } from "rxjs";
import { delay, materialize, dematerialize } from "rxjs/operators";
import { User } from "../_models/user";
import { Suit } from "@app/_models/suit";
import { mockData } from "@assets/mock-data";

const usersKey = "e-commerce-users";
const users: User[] = JSON.parse(localStorage.getItem(usersKey)!) || [];

const suits: Suit[] = mockData;

export function mockBackendInterceptor(request: HttpRequest<any>, next: HttpHandlerFn) {
    // headers
    const { url, method, body } = request;

    return handleRoute();

    function handleRoute() {
        switch (true) {
            case url.endsWith("/users/authenticate") && method === "POST":
                return authenticate();
            case url.endsWith("/users/register") && method === "POST":
                return register();
            case url.endsWith("/suits") && method === "GET":
                return getSuits();
            default:
                // pass through any requests not handled above
                return next(request);
        }
    }

    // route functions

    function authenticate() {
        const { email, password } = body;
        const user = users.find((x) => x.email === email && x.password === password);
        if (!user) return error("email or password is incorrect");
        return ok({
            ...basicDetails(user),
            token: "fake-jwt-token",
        });
    }

    function register() {
        const user = body;

        if (users.find((x) => x.email === user.email)) {
            return error('Email "' + user.email + '" is already registered');
        }

        user.id = users.length ? Math.max(...users.map((x) => x.id!)) + 1 : 1;
        users.push(user);
        localStorage.setItem(usersKey, JSON.stringify(users));
        return ok();
    }

    function getSuits() {
        return ok(suits, 3000);
    }

    // helper functions

    function ok(body?: any, delaysInMiliseconds = 500) {
        return of(new HttpResponse({ status: 200, body })).pipe(delay(delaysInMiliseconds)); // delay observable to simulate server api call
    }

    function error(message: string) {
        return throwError(() => ({ error: { message } })).pipe(materialize(), delay(500), dematerialize());
    }

    function basicDetails(user: any) {
        const { id, email, firstName, lastName } = user;
        return { id, email, firstName, lastName };
    }
}
