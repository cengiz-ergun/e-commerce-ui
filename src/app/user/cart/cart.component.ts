import { Component } from "@angular/core";
import { TableModule } from "primeng/table";
import { ButtonModule } from "primeng/button";
import { RatingModule } from "primeng/rating";
import { TagModule } from "primeng/tag";
import { FormsModule } from "@angular/forms";
import { Cart } from "@app/_models/cart";
import { NgIf } from "@angular/common";
import { StyleClassModule } from "primeng/styleclass";
import { CartService } from "@app/_services/cart.service";
import { CartItem } from "@app/_models/cart-item";
import { RouterLink } from "@angular/router";

@Component({
    selector: "app-cart",
    standalone: true,
    imports: [TableModule, ButtonModule, RatingModule, TagModule, FormsModule, NgIf, StyleClassModule, RouterLink],
    templateUrl: "./cart.component.html",
    styleUrl: "./cart.component.scss",
})
export class CartComponent {
    cart!: Cart;
    cartItems!: CartItem[];

    constructor(private cartService: CartService) {
        this.cartService.cart$.subscribe((cart) => {
            this.cart = cart;
            this.cartItems = cart.cartItems;
        });
    }

    refreshCart() {
        console.log("TODO: Refresh Cart");
    }
}
