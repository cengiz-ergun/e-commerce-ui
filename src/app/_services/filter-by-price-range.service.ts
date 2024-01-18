import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";

@Injectable({
    providedIn: "root",
})
export class FilterByPriceRangeService {
    private rangeValuesSubject = new BehaviorSubject<number[]>([0, 0]);
    rangeValues$: Observable<number[]> = this.rangeValuesSubject.asObservable();

    updateRangeValues(values: number[]) {
        this.rangeValuesSubject.next(values);
    }
}
