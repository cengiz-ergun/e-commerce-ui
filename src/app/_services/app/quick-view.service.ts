import { Injectable } from "@angular/core";
import { Suit } from "@app/_models/suit";
import { BehaviorSubject, Observable } from "rxjs";

@Injectable({
    providedIn: "root",
})
export class QuickViewService {
    private selectedSuitSubject = new BehaviorSubject<Suit | null>(null);
    selectedSuit$: Observable<Suit | null> = this.selectedSuitSubject.asObservable();

    updateSelectedSuit(suit: Suit) {
        this.selectedSuitSubject.next(suit);
    }
}
