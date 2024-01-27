import { Component } from "@angular/core";
import { GaleryItemsComponent } from "@app/customer/components/galery-items/galery-items.component";
import { DiscountComponent } from "@app/customer/page-sections/sections-of-home/discount/discount.component";
import { TopCategoryAreaComponent } from "@app/customer/page-sections/sections-of-home/top-category-area/top-category-area.component";
import { QuickViewModalAreaComponent } from "@app/customer/components/quick-view-modal-area/quick-view-modal-area.component";

@Component({
    selector: "app-home",
    standalone: true,
    imports: [DiscountComponent, GaleryItemsComponent, TopCategoryAreaComponent, QuickViewModalAreaComponent],
    templateUrl: "./home.component.html",
    styleUrl: "./home.component.scss",
})
export class HomeComponent {}
