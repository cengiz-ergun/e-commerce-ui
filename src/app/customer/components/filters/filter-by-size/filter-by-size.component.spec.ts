import { ComponentFixture, TestBed } from "@angular/core/testing";

import { FilterBySizeComponent } from "./filter-by-size.component";

describe("FilterBySizeComponent", () => {
    let component: FilterBySizeComponent;
    let fixture: ComponentFixture<FilterBySizeComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [FilterBySizeComponent],
        }).compileComponents();

        fixture = TestBed.createComponent(FilterBySizeComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it("should create", () => {
        expect(component).toBeTruthy();
    });
});
