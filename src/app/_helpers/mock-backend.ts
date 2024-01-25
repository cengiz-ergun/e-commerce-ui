import { HttpRequest, HttpResponse, HttpHandlerFn } from "@angular/common/http";
import { of, throwError } from "rxjs";
import { delay, materialize, dematerialize } from "rxjs/operators";
import { User } from "../_models/user";
import { Suit } from "@app/_models/suit";
import { mockData } from "@assets/mock-data";
import { Role } from "@app/_models/enums/role";

const usersKey = "e-commerce-users";
const users: User[] = JSON.parse(localStorage.getItem(usersKey)!) || [];

let suits: Suit[] = mockData;

export function mockBackendInterceptor(request: HttpRequest<any>, next: HttpHandlerFn) {
    const { url, method, headers, body } = request;

    return handleRoute();

    function handleRoute() {
        switch (true) {
            case url.endsWith("/users/authenticate") && method === "POST":
                return authenticate();
            case url.endsWith("/users/register") && method === "POST":
                return register();
            case url.endsWith("/suits") && method === "GET":
                return getSuits();
            case url.endsWith("/admin") && method === "POST":
                return postSuit();
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

        let token: string;
        if (user.role === Role.admin) {
            token = "fake-admin-jwt-token";
        } else {
            token = "fake-user-jwt-token";
        }

        return ok({
            ...basicDetails(user),
            token: token,
            role: user.role,
        });
    }

    function register() {
        const user = body;

        if (users.find((x) => x.email === user.email)) {
            return error('Email "' + user.email + '" is already registered');
        }

        user.id = users.length ? Math.max(...users.map((x) => x.id!)) + 1 : 1;
        user.role = user.id === 1 ? Role.admin : Role.user;
        users.push(user);
        localStorage.setItem(usersKey, JSON.stringify(users));
        return ok();
    }

    function getSuits() {
        return ok(suits, 3000);
    }

    function postSuit() {
        if (!isAdminLoggedIn()) return unauthorized();

        const product: Suit = body;
        product.id = Number(createId());
        suits = [...suits, product];
        return created("New product is created.");
        // return error("intentionally error");
    }

    // helper functions

    function ok(body?: any, delaysInMiliseconds = 500) {
        return of(new HttpResponse({ status: 200, body })).pipe(delay(delaysInMiliseconds)); // delay observable to simulate server api call
    }

    function created(body?: any, delaysInMiliseconds = 500) {
        return of(new HttpResponse({ status: 201, body })).pipe(delay(delaysInMiliseconds)); // delay observable to simulate server api call
    }

    function error(message: string) {
        return throwError(() => ({ error: { message } })).pipe(materialize(), delay(500), dematerialize());
    }

    function unauthorized() {
        return throwError(() => ({ status: 401, error: { message: "Unauthorized" } })).pipe(
            materialize(),
            delay(500),
            dematerialize()
        );
    }

    function basicDetails(user: any) {
        const { id, email, firstName, lastName } = user;
        return { id, email, firstName, lastName };
    }

    function isAdminLoggedIn() {
        return headers.get("Authorization") === "Bearer fake-admin-jwt-token";
    }

    function createId(): string {
        let id = "";
        const chars = "0123456789";
        for (let i = 0; i < 5; i++) {
            id += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        return id;
    }
}
