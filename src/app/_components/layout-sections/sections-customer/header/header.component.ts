import { CommonModule } from "@angular/common";
import { Component } from "@angular/core";
import { RouterLink, RouterModule } from "@angular/router";
import { Role } from "@app/_models/enums/role";
import { User } from "@app/_models/user";
import { HttpService } from "@app/_services/api/http.service";
import { CartService } from "@app/_services/app/cart.service";

@Component({
    selector: "app-header",
    standalone: true,
    imports: [CommonModule, RouterLink, RouterModule],
    templateUrl: "./header.component.html",
    styleUrl: "./header.component.scss",
})
export class HeaderComponent {
    user?: User | null;

    quantity = 0;

    constructor(
        private httpService: HttpService,
        private cartService: CartService
    ) {
        this.httpService.user.subscribe((user) => (this.user = user));

        this.cartService.cart$.subscribe(() => {
            this.quantity = this.cartService.numberOfItemInTheBasket;
        });
    }

    logout() {
        this.httpService.logout();
    }

    isAdmin(): boolean {
        return this.user!.role === Role.admin;
    }
}
