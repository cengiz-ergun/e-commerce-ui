import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { HttpClient } from "@angular/common/http";
import { BehaviorSubject, Observable, map } from "rxjs";
import { environment } from "@environments/environment";
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
        return this.http.post<User>(`${environment.apiUrl}/users/authenticate`, { email, password }).pipe(
            map((user) => {
                // store user details and jwt token in local storage to keep user logged in between page refreshes
                localStorage.setItem("user", JSON.stringify(user));
                this.userSubject.next(user);
                return user;
            })
        );
    }

    register(user: User) {
        return this.http.post(`${environment.apiUrl}/users/register`, user);
    }

    logout() {
        // remove user from local storage and set current user to null
        localStorage.removeItem("user");
        this.userSubject.next(null);
        this.router.navigate(["/login"]);
    }

    getAllSuits() {
        return this.http.get<Suit[]>(`${environment.apiUrl}/suits`);
    }

    postSuit(suit: Suit) {
        return this.http.post(`${environment.apiUrl}/suits`, suit);
    }

    deleteSuit(id: number) {
        return this.http.delete(`${environment.apiUrl}/suits/${id}`);
    }

    deleteSuits(ids: number[]) {
        return this.http.post(`${environment.apiUrl}/suits/multiple-suits-delete`, { ids: ids });
    }

    updateSuit(id: number, suit: Suit) {
        return this.http.put(`${environment.apiUrl}/suits/${id}`, suit);
    }
}