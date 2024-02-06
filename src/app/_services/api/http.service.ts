import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { HttpClient } from "@angular/common/http";
import { BehaviorSubject, Observable, map } from "rxjs";
import { Suit } from "@app/_models/suit";
import { User } from "@app/_models/user";
import { jwtDecode } from "jwt-decode";

@Injectable({ providedIn: "root" })
export class HttpService {
    private userSubject: BehaviorSubject<User | null>;
    private token: string | null;
    public user: Observable<User | null>;

    constructor(
        private router: Router,
        private http: HttpClient
    ) {
        this.token = localStorage.getItem("access-token");
        this.userSubject = new BehaviorSubject<any>(this.token ? this.parseUserToken(this.token) : null);
        this.user = this.userSubject.asObservable();
    }

    public get userValue() {
        return this.userSubject.value;
    }

    parseUserToken(token: string): User {
        const result = jwtDecode(token);
        const logInUser: User = result as User;
        logInUser.token = token;
        return logInUser;
    }

    login(email: string, password: string) {
        return this.http.post<any>(`${import.meta.env.NG_APP_API_URL}/users/authenticate`, { email, password }).pipe(
            map((response) => {
                // store jwt token in local storage
                localStorage.setItem("access-token", response.token);

                this.userSubject.next(this.parseUserToken(response.token));
            })
        );
    }

    register(user: User) {
        return this.http.post(`${import.meta.env.NG_APP_API_URL}/users/register`, user);
    }

    logout() {
        // remove user from local storage and set current user to null
        localStorage.removeItem("access-token");
        this.userSubject.next(null);
        this.router.navigate(["/login"]);
    }

    getAllSuits() {
        return this.http.get<Suit[]>(`${import.meta.env.NG_APP_API_URL}/suits`);
    }

    postSuit(suit: Suit) {
        return this.http.post(`${import.meta.env.NG_APP_API_URL}/suits`, suit);
    }

    deleteSuit(id: string) {
        return this.http.delete(`${import.meta.env.NG_APP_API_URL}/suits/${id}`);
    }

    deleteSuits(ids: string[]) {
        return this.http.post(`${import.meta.env.NG_APP_API_URL}/suits/multiple-suits-delete`, { ids: ids });
    }

    updateSuit(id: string, suit: Suit) {
        return this.http.put(`${import.meta.env.NG_APP_API_URL}/suits/${id}`, suit);
    }
}
