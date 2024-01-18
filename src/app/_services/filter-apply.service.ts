import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";

@Injectable({
    providedIn: "root",
})
export class FilterApplyService {
    private clicked = new BehaviorSubject<boolean>(false);
    filterValue$: Observable<boolean> = this.clicked.asObservable();

    updateClickedState(value: boolean) {
        this.clicked.next(value);
    }
}
