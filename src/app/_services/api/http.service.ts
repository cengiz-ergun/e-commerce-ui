import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { HttpClient } from "@angular/common/http";
import { BehaviorSubject, Observable, map } from "rxjs";
import { Suit } from "@app/_models/suit";
import { User } from "@app/_models/user";

@Injectable({ providedIn: "root" })
export class HttpService {
    private userSubject: BehaviorSubject<User | null>;
    public user: Observable<User | null>;

    constructor(
        private router: Router,
        private http: HttpClient
    ) {
        this.userSubject = new BehaviorSubject(JSON.parse(localStorage.getItem("user")!));
        this.user = this.userSubject.asObservable();
    }

    public get userValue() {
        return this.userSubject.value;
    }

    login(email: string, password: string) {
        return this.http.post<User>(`${import.meta.env.NG_APP_API_URL}/users/authenticate`, { email, password }).pipe(
            map((user) => {
                // store user details and jwt token in local storage to keep user logged in between page refreshes
                localStorage.setItem("user", JSON.stringify(user));
                this.userSubject.next(user);
                return user;
            })
        );
    }

    register(user: User) {
        return this.http.post(`${import.meta.env.NG_APP_API_URL}/users/register`, user);
    }

    logout() {
        // remove user from local storage and set current user to null
        localStorage.removeItem("user");
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
