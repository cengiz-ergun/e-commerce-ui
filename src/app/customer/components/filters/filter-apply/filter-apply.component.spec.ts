import { ComponentFixture, TestBed } from "@angular/core/testing";

import { FilterApplyComponent } from "./filter-apply.component";

describe("FilterApplyComponent", () => {
    let component: FilterApplyComponent;
    let fixture: ComponentFixture<FilterApplyComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [FilterApplyComponent],
        }).compileComponents();

        fixture = TestBed.createComponent(FilterApplyComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it("should create", () => {
        expect(component).toBeTruthy();
    });
});
