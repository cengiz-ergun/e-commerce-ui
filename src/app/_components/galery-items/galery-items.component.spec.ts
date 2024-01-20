import { ComponentFixture, TestBed } from "@angular/core/testing";

import { GaleryItemsComponent } from "./galery-items.component";

describe("GaleryItemsComponent", () => {
    let component: GaleryItemsComponent;
    let fixture: ComponentFixture<GaleryItemsComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [GaleryItemsComponent],
        }).compileComponents();

        fixture = TestBed.createComponent(GaleryItemsComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it("should create", () => {
        expect(component).toBeTruthy();
    });
});
