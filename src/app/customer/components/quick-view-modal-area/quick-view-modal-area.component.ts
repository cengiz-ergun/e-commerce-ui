import { NgFor, NgIf } from "@angular/common";
import { Component, HostListener, OnInit } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { CartItem } from "@app/_models/cart-item";
import { Size } from "@app/_models/enums/size";
import { Suit } from "@app/_models/suit";
import { AlertService } from "@app/_services/app/alert.service";
import { CartService } from "@app/_services/app/cart.service";
import { QuickViewService } from "@app/_services/app/quick-view.service";
import { RadioButtonModule } from "primeng/radiobutton";

@Component({
    selector: "app-quick-view-modal-area",
    standalone: true,
    imports: [NgIf, NgFor, FormsModule, RadioButtonModule],
    templateUrl: "./quick-view-modal-area.component.html",
    styleUrl: "./quick-view-modal-area.component.scss",
})
export class QuickViewModalAreaComponent implements OnInit {
    // When clicking outside the modal, make cartItemQuantity 1
    @HostListener("document:click")
    outsideComponent() {
        if (this.cartItemQuantity !== 1) {
            this.cartItemQuantity = 1;
        }
    }
    @HostListener("click", ["$event"])
    insideComponent(e: any) {
        e.stopPropagation();
    }

    suit!: Suit | null;
    cartItemQuantity = 1;
    selectedSize!: Size | null;

    constructor(
        private quickViewService: QuickViewService,
        private cartService: CartService,
        private alertService: AlertService
    ) {}

    ngOnInit(): void {
        this.quickViewService.selectedSuit$.subscribe((suit) => {
            this.suit = suit;
            if (this.suit) this.selectedSize = this.suit!.sizes[0];
        });
    }

    increase() {
        this.cartItemQuantity += 1;
    }

    decrease() {
        this.cartItemQuantity -= 1;
    }

    addToTheCart() {
        this.alertService.clear();
        const cartItem: CartItem = {
            primaryInfo: this.suit!.primaryInfo,
            size: this.selectedSize!,
            quantity: this.cartItemQuantity,
            price: this.suit!.price,
            firstImgPath: this.suit!.imgPaths[0],
        };
        this.cartService.updateCart(cartItem);
        // TODO:return a response from service to indicate whether the action is succesfully completed or not.
        this.alertService.success("Your card is updated succesfully.");
    }
}
