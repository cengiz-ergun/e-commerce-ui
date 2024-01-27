import { ComponentFixture, TestBed } from "@angular/core/testing";

import { TopDiscountAreaComponent } from "./top-discount-area.component";

describe("TopDiscountAreaComponent", () => {
    let component: TopDiscountAreaComponent;
    let fixture: ComponentFixture<TopDiscountAreaComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [TopDiscountAreaComponent],
        }).compileComponents();

        fixture = TestBed.createComponent(TopDiscountAreaComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it("should create", () => {
        expect(component).toBeTruthy();
    });
});
