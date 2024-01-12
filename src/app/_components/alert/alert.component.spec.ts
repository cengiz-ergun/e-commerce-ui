import { ComponentFixture, TestBed } from "@angular/core/testing";

import { AlertComponent } from "./alert.component";

describe("AlertComponentComponent", () => {
    let component: AlertComponent;
    let fixture: ComponentFixture<AlertComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [AlertComponent],
        }).compileComponents();

        fixture = TestBed.createComponent(AlertComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it("should create", () => {
        expect(component).toBeTruthy();
    });
});
