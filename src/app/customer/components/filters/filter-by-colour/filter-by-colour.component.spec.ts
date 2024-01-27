import { ComponentFixture, TestBed } from "@angular/core/testing";

import { FilterByColourComponent } from "./filter-by-colour.component";

describe("FilterByColourComponent", () => {
    let component: FilterByColourComponent;
    let fixture: ComponentFixture<FilterByColourComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [FilterByColourComponent],
        }).compileComponents();

        fixture = TestBed.createComponent(FilterByColourComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it("should create", () => {
        expect(component).toBeTruthy();
    });
});
