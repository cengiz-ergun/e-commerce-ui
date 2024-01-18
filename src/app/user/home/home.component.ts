import { Component } from "@angular/core";
import { GaleryItemsComponent } from "@app/_components/galery-items/galery-items.component";
import { DiscountComponent } from "@app/_components/sections/home/discount/discount.component";
import { TopCategoryAreaComponent } from "@app/_components/sections/home/top-category-area/top-category-area.component";

@Component({
    selector: "app-home",
    standalone: true,
    imports: [DiscountComponent, GaleryItemsComponent, TopCategoryAreaComponent],
    templateUrl: "./home.component.html",
    styleUrl: "./home.component.scss",
})
export class HomeComponent {}
