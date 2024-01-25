import { NgFor, NgIf } from "@angular/common";
import { Component } from "@angular/core";
import { FilterApplyComponent } from "@app/_components/filter-apply/filter-apply.component";
import { FilterByColourComponent } from "@app/_components/filter-by-colour/filter-by-colour.component";
import { FilterByPriceRangeComponent } from "@app/_components/filter-by-price-range/filter-by-price-range.component";
import { FilterBySizeComponent } from "@app/_components/filter-by-size/filter-by-size.component";
import { GaleryItemsComponent } from "@app/_components/galery-items/galery-items.component";
import { QuickViewModalAreaComponent } from "@app/_components/sections/quick-view-modal-area/quick-view-modal-area.component";
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
