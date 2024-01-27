import { ComponentFixture, TestBed } from "@angular/core/testing";

import { LayoutCustomerComponent } from "./layout-customer.component";

describe("LayoutCustomerComponent", () => {
    let component: LayoutCustomerComponent;
    let fixture: ComponentFixture<LayoutCustomerComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [LayoutCustomerComponent],
        }).compileComponents();

        fixture = TestBed.createComponent(LayoutCustomerComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it("should create", () => {
        expect(component).toBeTruthy();
    });
});
