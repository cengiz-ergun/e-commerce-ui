import { Injectable } from "@angular/core";
import { Cart } from "@app/_models/cart";
import { CartItem } from "@app/_models/cart-item";
import { BehaviorSubject, Observable } from "rxjs";

const cartKey = "e-commerce-cart";
const cart: Cart = JSON.parse(localStorage.getItem(cartKey)!) || { cartItems: [] };

@Injectable({
    providedIn: "root",
})
export class CartService {
    private cartSubject: BehaviorSubject<Cart>;
    cart$: Observable<Cart>;

    constructor() {
        this.cartSubject = new BehaviorSubject(cart);
        this.cart$ = this.cartSubject.asObservable();
    }

    public get numberOfItemInTheBasket() {
        return this.cartSubject.value.cartItems.reduce((accumulator, currentItem) => {
            return accumulator + currentItem.quantity;
        }, 0);
    }

    public get totalPriceOfTheBasket() {
        return this.cartSubject.value.cartItems.reduce((accumulator, currentItem) => {
            return accumulator + currentItem.price * currentItem.quantity;
        }, 0);
    }

    updateCart(cartItem: CartItem) {
        // is there already a cart item with same id and size in the cart?
        const existingCartItem = this.cartSubject.value.cartItems.find(
            (ci) => ci.primaryInfo === cartItem.primaryInfo && ci.size === cartItem.size
        );

        // if there isn't, add this cart item to the cart
        if (!existingCartItem) {
            this.cartSubject.next({ cartItems: [...this.cartSubject.value.cartItems, cartItem] });
        } else {
            // if not, create a new cart item which has a quantity of sum of new and old quantities
            this.cartSubject.next({
                cartItems: [
                    ...this.cartSubject.value.cartItems.filter((ci) => ci.primaryInfo !== cartItem.primaryInfo),
                    {
                        primaryInfo: cartItem.primaryInfo,
                        size: cartItem.size,
                        firstImgPath: cartItem.firstImgPath,
                        price: cartItem.price,
                        quantity: cartItem.quantity + existingCartItem.quantity,
                    },
                ],
            });
        }

        localStorage.setItem(cartKey, JSON.stringify(this.cartSubject.value));
    }

    clearCart() {
        this.cartSubject.next({ cartItems: [] });

        localStorage.setItem(cartKey, JSON.stringify(this.cartSubject.value));
    }
}
