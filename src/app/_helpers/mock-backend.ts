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
            case url.match(/\/admin\/\d+$/) && method === "DELETE":
                return deleteSuit();
            case url.match(/\/admin\/\d+$/) && method === "PUT":
                return updateSuit();
            case url.match("/admin/multiple-suits-delete") && method === "POST":
                return deleteSuits();
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
    }

    function deleteSuit() {
        if (!isAdminLoggedIn()) return unauthorized();

        const lengthBefore = suits.length;
        suits = suits.filter((suit) => suit.id !== idFromUrl());
        const lengthAfter = suits.length;
        const diff = lengthBefore - lengthAfter;
        if (diff === 1) {
            return ok("deleted succesfully.");
        } else {
            return error("some things are wrong.");
        }
    }

    function updateSuit() {
        if (!isAdminLoggedIn()) return unauthorized();

        const id = idFromUrl();
        const product: Suit = body;
        if (product.id! !== id) {
            return error("id's are not same.");
        }

        const currentProduct = suits.find((suit) => suit.id === id);
        if (!currentProduct) {
            return error(`There is not any suit with the id: ${id}`);
        } else {
            suits = suits.map((suit) => (suit.id === id ? product : suit));
            return ok("Product is succesfully updated.");
        }
    }

    function deleteSuits() {
        if (!isAdminLoggedIn()) return unauthorized();

        const ids: number[] = body.ids;
        const lengthBefore = suits.length;
        suits = suits.filter((suit) => !ids.includes(suit.id!));
        const lengthAfter = suits.length;
        const diff = lengthBefore - lengthAfter;
        if (diff === ids.length) {
            return ok("items deleted succesfully.");
        } else {
            return error("some things are wrong.");
        }
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

    function idFromUrl() {
        const urlParts = url.split("/");
        return parseInt(urlParts[urlParts.length - 1]);
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
