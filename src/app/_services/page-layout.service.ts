import { Injectable } from "@angular/core";
import { PageLayout } from "@app/_models/page-layout";
import { BehaviorSubject } from "rxjs";

@Injectable({
    providedIn: "root",
})
export class PageLayoutService {
    private layoutSubject = new BehaviorSubject<PageLayout>(PageLayout.Blank);

    public layout$ = this.layoutSubject.asObservable();

    setLayout(value: PageLayout) {
        this.layoutSubject.next(value);
    }
}
