import { Injectable } from "@angular/core";
import { SuitColour } from "@app/_models/enums/suit-colour";
import { BehaviorSubject, Observable } from "rxjs";

@Injectable({
    providedIn: "root",
})
export class FilterByColourService {
    private colourValuesSubject = new BehaviorSubject<SuitColour[]>([]);
    colourValues$: Observable<SuitColour[]> = this.colourValuesSubject.asObservable();

    updateColourValues(values: SuitColour[]) {
        this.colourValuesSubject.next(values);
    }
}
