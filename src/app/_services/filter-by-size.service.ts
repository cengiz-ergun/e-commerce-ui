import { Injectable } from "@angular/core";
import { Size } from "@app/_models/enums/size";
import { BehaviorSubject, Observable } from "rxjs";

@Injectable({
    providedIn: "root",
})
export class FilterBySizeService {
    private sizeValuesSubject = new BehaviorSubject<Size[]>([]);
    sizeValues$: Observable<Size[]> = this.sizeValuesSubject.asObservable();

    updateSizeValues(values: Size[]) {
        this.sizeValuesSubject.next(values);
    }
}
