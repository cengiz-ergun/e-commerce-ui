import { ComponentFixture, TestBed } from "@angular/core/testing";

import { TopCategoryAreaComponent } from "./top-category-area.component";

describe("TopCategoryAreaComponent", () => {
    let component: TopCategoryAreaComponent;
    let fixture: ComponentFixture<TopCategoryAreaComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [TopCategoryAreaComponent],
        }).compileComponents();

        fixture = TestBed.createComponent(TopCategoryAreaComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it("should create", () => {
        expect(component).toBeTruthy();
    });
});
