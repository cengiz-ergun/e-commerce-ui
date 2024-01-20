import { Component } from "@angular/core";
import { RouterLink } from "@angular/router";

@Component({
    selector: "app-discount",
    standalone: true,
    imports: [RouterLink],
    templateUrl: "./discount.component.html",
    styleUrl: "./discount.component.scss",
})
export class DiscountComponent {}
