import { Component } from "@angular/core";
import { TableModule } from "primeng/table";
import { ButtonModule } from "primeng/button";
import { RatingModule } from "primeng/rating";
import { DialogModule } from "primeng/dialog";
import { TagModule } from "primeng/tag";
import { FormsModule } from "@angular/forms";
import { Cart } from "@app/_models/cart";
import { CurrencyPipe, NgIf } from "@angular/common";
import { StyleClassModule } from "primeng/styleclass";
import { CartService } from "@app/_services/app/cart.service";
import { CartItem } from "@app/_models/cart-item";
import { RouterLink } from "@angular/router";

@Component({
    selector: "app-cart",
    standalone: true,
    imports: [
        DialogModule,
        TableModule,
        ButtonModule,
        RatingModule,
        TagModule,
        FormsModule,
        NgIf,
        StyleClassModule,
        RouterLink,
        CurrencyPipe,
    ],
    templateUrl: "./cart.component.html",
    styleUrl: "./cart.component.scss",
})
export class CartComponent {
    cart!: Cart;
    cartItems!: CartItem[];
    visible = false;
    quantity = 0;
    totalPrice = 0;

    constructor(private cartService: CartService) {
        this.cartService.cart$.subscribe((cart) => {
            this.cart = cart;
            this.cartItems = cart.cartItems;
            this.quantity = this.cartService.numberOfItemInTheBasket;
            this.totalPrice = this.cartService.totalPriceOfTheBasket;
        });
    }

    showDialog() {
        this.visible = true;
    }

    clearCart() {
        this.cartService.clearCart();
        this.visible = false;
    }
}
