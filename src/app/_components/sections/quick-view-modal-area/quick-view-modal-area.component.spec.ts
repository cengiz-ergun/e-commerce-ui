import { ComponentFixture, TestBed } from "@angular/core/testing";

import { QuickViewModalAreaComponent } from "./quick-view-modal-area.component";

describe("QuickViewModalAreaComponent", () => {
    let component: QuickViewModalAreaComponent;
    let fixture: ComponentFixture<QuickViewModalAreaComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [QuickViewModalAreaComponent],
        }).compileComponents();

        fixture = TestBed.createComponent(QuickViewModalAreaComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it("should create", () => {
        expect(component).toBeTruthy();
    });
});
