import { Component } from "@angular/core";
import { DiscountComponent } from "@app/_components/sections/home/discount/discount.component";
import { NewArrivalsComponent } from "@app/_components/sections/home/new-arrivals/new-arrivals.component";

@Component({
    selector: "app-home",
    standalone: true,
    imports: [NewArrivalsComponent, DiscountComponent],
    templateUrl: "./home.component.html",
    styleUrl: "./home.component.scss",
})
export class HomeComponent {}
