import { CommonModule } from "@angular/common";
import { Component } from "@angular/core";
import { RouterLink, RouterLinkActive, RouterOutlet } from "@angular/router";
import { AlertComponent } from "@app/_components/alert/alert.component";
import { FooterComponent } from "@app/_components/layout-sections/sections-customer/footer/footer.component";
import { HeaderComponent } from "@app/_components/layout-sections/sections-customer/header/header.component";
import { TopDiscountAreaComponent } from "@app/_components/layout-sections/sections-customer/top-discount-area/top-discount-area.component";
import { HttpService } from "@app/_services/api/http.service";

@Component({
    selector: "app-layout-customer",
    standalone: true,
    imports: [
        CommonModule,
        RouterOutlet,
        AlertComponent,
        RouterLink,
        RouterLinkActive,
        HeaderComponent,
        FooterComponent,
        TopDiscountAreaComponent,
    ],
    templateUrl: "./layout-customer.component.html",
    styleUrl: "./layout-customer.component.scss",
})
export class LayoutCustomerComponent {
    constructor(private httpService: HttpService) {}

    logout() {
        this.httpService.logout();
    }
}
