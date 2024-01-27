import { Inject, Injectable } from "@angular/core";
import { Size } from "@app/_models/enums/size";
import { SuitColour } from "@app/_models/enums/suit-colour";
import { BehaviorSubject, Observable } from "rxjs";

@Injectable({
    providedIn: "root",
})
export class FilterService<T> {
    private valuesSubject = new BehaviorSubject<T[]>([]);
    values$: Observable<T[]> = this.valuesSubject.asObservable();

    constructor(@Inject("initialValue") private initialValue: T[]) {
        this.updateValues(initialValue);
    }

    updateValues(values: T[]) {
        this.valuesSubject.next(values);
    }
}

@Injectable({
    providedIn: "root",
})
export class FilterByColourService extends FilterService<SuitColour> {
    constructor() {
        super([]);
    }
}

@Injectable({
    providedIn: "root",
})
export class FilterByPriceRangeService extends FilterService<number> {
    constructor() {
        super([0, 0]);
    }
}

@Injectable({
    providedIn: "root",
})
export class FilterBySizeService extends FilterService<Size> {
    constructor() {
        super([]);
    }
}

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
