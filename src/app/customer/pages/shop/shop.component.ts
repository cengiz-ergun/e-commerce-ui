import { NgFor, NgIf } from "@angular/common";
import { Component } from "@angular/core";
import { FilterApplyComponent } from "@app/customer/components/filters/filter-apply/filter-apply.component";
import { FilterByColourComponent } from "@app/customer/components/filters/filter-by-colour/filter-by-colour.component";
import { FilterByPriceRangeComponent } from "@app/customer/components/filters/filter-by-price-range/filter-by-price-range.component";
import { FilterBySizeComponent } from "@app/customer/components/filters/filter-by-size/filter-by-size.component";
import { GaleryItemsComponent } from "@app/customer/components/galery-items/galery-items.component";
import { QuickViewModalAreaComponent } from "@app/customer/components/quick-view-modal-area/quick-view-modal-area.component";
import { AccordionModule } from "primeng/accordion";

@Component({
    selector: "app-shop",
    standalone: true,
    imports: [
        NgFor,
        NgIf,
        GaleryItemsComponent,
        FilterByPriceRangeComponent,
        FilterByColourComponent,
        FilterBySizeComponent,
        FilterApplyComponent,
        QuickViewModalAreaComponent,
        AccordionModule,
    ],
    templateUrl: "./shop.component.html",
    styleUrl: "./shop.component.scss",
})
export class ShopComponent {}
