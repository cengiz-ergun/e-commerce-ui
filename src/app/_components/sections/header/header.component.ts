import { CommonModule } from "@angular/common";
import { Component } from "@angular/core";
import { RouterLink } from "@angular/router";
import { User } from "@app/_models/user";
import { AccountService } from "@app/_services/account.service";
import { CartService } from "@app/_services/cart.service";

@Component({
    selector: "app-header",
    standalone: true,
    imports: [CommonModule, RouterLink],
    templateUrl: "./header.component.html",
    styleUrl: "./header.component.scss",
})
export class HeaderComponent {
    user?: User | null;

    quantity = 0;

    constructor(
        private accountService: AccountService,
        private cartService: CartService
    ) {
        this.accountService.user.subscribe((user) => (this.user = user));

        this.cartService.cart$.subscribe((cart) => {
            this.quantity = cart.cartItems.reduce((accumulator, currentItem) => {
                return accumulator + currentItem.quantity;
            }, 0);
        });
    }

    logout() {
        this.accountService.logout();
    }
}
