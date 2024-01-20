import { ComponentFixture, TestBed } from "@angular/core/testing";

import { FilterByPriceRangeComponent } from "./filter-by-price-range.component";

describe("FilterByPriceComponent", () => {
    let component: FilterByPriceRangeComponent;
    let fixture: ComponentFixture<FilterByPriceRangeComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [FilterByPriceRangeComponent],
        }).compileComponents();

        fixture = TestBed.createComponent(FilterByPriceRangeComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it("should create", () => {
        expect(component).toBeTruthy();
    });
});
