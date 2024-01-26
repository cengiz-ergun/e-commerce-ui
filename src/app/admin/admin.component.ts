import { Component, OnInit } from "@angular/core";
import { RouterOutlet } from "@angular/router";
import { TableModule } from "primeng/table";
import { StyleClassModule } from "primeng/styleclass";
import { ToastModule } from "primeng/toast";
import { ToolbarModule } from "primeng/toolbar";
import { FileUploadModule } from "primeng/fileupload";
import { TagModule } from "primeng/tag";
import { DialogModule } from "primeng/dialog";
import { DropdownModule } from "primeng/dropdown";
import { RadioButtonModule } from "primeng/radiobutton";
import { InputNumberModule } from "primeng/inputnumber";
import { ConfirmDialogModule } from "primeng/confirmdialog";
import { FormsModule } from "@angular/forms";
import { ConfirmationService, MessageService } from "primeng/api";
import { CommonModule } from "@angular/common";
import { AccountService } from "@app/_services/account.service";
import { first } from "rxjs";
import { Suit } from "@app/_models/suit";
import { Gender } from "@app/_models/enums/gender";
import { Currency } from "@app/_models/enums/currency";
import { SuitColour } from "@app/_models/enums/suit-colour";
import { Brand } from "@app/_models/enums/brand";
import { Size } from "@app/_models/enums/size";
import { CheckboxModule } from "primeng/checkbox";

@Component({
    selector: "app-admin",
    standalone: true,
    imports: [
        RouterOutlet,
        TableModule,
        StyleClassModule,
        ToastModule,
        ToolbarModule,
        FileUploadModule,
        TagModule,
        DialogModule,
        DropdownModule,
        RadioButtonModule,
        InputNumberModule,
        ConfirmDialogModule,
        FormsModule,
        CommonModule,
        CheckboxModule,
    ],
    templateUrl: "./admin.component.html",
    styleUrl: "./admin.component.scss",
    providers: [MessageService, ConfirmationService],
    animations: [],
})
export class AdminComponent implements OnInit {
    productDialog = false;
    products: Suit[] = [];
    product!: Suit;
    initializeProduct: Suit = {
        gender: Gender.Men,
        price: 0,
        currency: Currency.TL,
        primaryInfo: "",
        secondaryInfo: "",
        tertiaryInfo: "",
        sizes: [],
        colour: SuitColour.Black,
        brand: Brand.Farah,
        available: false,
        imgPaths: [],
        stock: 0,
    };
    selectedProducts!: Suit[] | null;
    submitted = false;

    genders = Object.keys(Gender).filter((key) => isNaN(Number(key)));
    colours = Object.keys(SuitColour).filter((key) => isNaN(Number(key)));
    sizes = Object.keys(Size).filter((key) => isNaN(Number(key)));
    brands = Object.keys(Brand).filter((key) => isNaN(Number(key)));

    constructor(
        private messageService: MessageService,
        private confirmationService: ConfirmationService,
        private accountService: AccountService
    ) {}

    stringToGender(gender: string): Gender {
        return Gender[gender as keyof typeof Gender];
    }
    stringToColour(colour: string): SuitColour {
        return SuitColour[colour as keyof typeof SuitColour];
    }
    stringToSize(size: string): Size {
        return Size[size as keyof typeof Size];
    }
    stringToBrand(brand: string): Brand {
        return Brand[brand as keyof typeof Brand];
    }

    onSizeSelectionChange(size: string) {
        this.product = { ...this.product, sizes: [...this.product.sizes, Size[size as keyof typeof Size]] };
    }

    ngOnInit() {
        this.accountService
            .getAllSuits()
            .pipe(first())
            .subscribe((suits) => {
                this.products = suits;
            });
    }

    openNew() {
        this.product = { ...this.initializeProduct };
        this.submitted = false;
        this.productDialog = true;
    }

    deleteSelectedProducts() {
        this.confirmationService.confirm({
            message: "Are you sure you want to delete the selected products?",
            header: "Confirm",
            icon: "pi pi-exclamation-triangle",
            accept: () => {
                // this.products = this.products.filter((val) => !this.selectedProducts?.includes(val));
                this.accountService
                    .deleteSuits(this.selectedProducts!.map((suit) => suit.id!))
                    .pipe(first())
                    .subscribe({
                        next: (message) => {
                            this.accountService
                                .getAllSuits()
                                .pipe(first())
                                .subscribe((suits) => {
                                    this.products = suits;
                                    this.messageService.add({
                                        severity: "success",
                                        summary: "Successful",
                                        detail: message.toString(),
                                        life: 3000,
                                    });
                                });
                        },
                        error: (error) => {
                            this.messageService.add({
                                severity: "error",
                                summary: "Error",
                                detail: error,
                                life: 3000,
                            });
                        },
                    });
                this.selectedProducts = null;
            },
        });
    }

    editProduct(product: Suit) {
        this.product = { ...product };
        this.productDialog = true;
    }

    deleteProduct(product: Suit) {
        this.confirmationService.confirm({
            message: "Are you sure you want to delete id with " + product.id + "?",
            header: "Confirm",
            icon: "pi pi-exclamation-triangle",
            accept: () => {
                this.accountService
                    .deleteSuit(product.id!)
                    .pipe(first())
                    .subscribe({
                        next: (message) => {
                            this.accountService
                                .getAllSuits()
                                .pipe(first())
                                .subscribe((suits) => {
                                    this.products = suits;
                                    this.messageService.add({
                                        severity: "success",
                                        summary: "Successful",
                                        detail: message.toString(),
                                        life: 3000,
                                    });
                                });
                        },
                        error: (error) => {
                            this.messageService.add({
                                severity: "error",
                                summary: "Error",
                                detail: error,
                                life: 3000,
                            });
                        },
                    });
            },
        });
    }

    hideDialog() {
        this.productDialog = false;
        this.submitted = false;
    }

    saveProduct() {
        this.submitted = true;

        if (this.product.primaryInfo?.trim()) {
            if (this.product.id) {
                this.accountService
                    .updateSuit(this.product.id, this.product)
                    .pipe(first())
                    .subscribe({
                        next: (message) => {
                            this.accountService
                                .getAllSuits()
                                .pipe(first())
                                .subscribe((suits) => {
                                    this.products = suits;
                                    this.messageService.add({
                                        severity: "success",
                                        summary: "Successful",
                                        detail: message.toString(),
                                        life: 3000,
                                    });
                                });
                        },
                        error: (error) => {
                            this.messageService.add({
                                severity: "error",
                                summary: "Error",
                                detail: error,
                                life: 3000,
                            });
                        },
                    });
            } else {
                this.accountService
                    .postSuit(this.product)
                    .pipe(first())
                    .subscribe({
                        next: (message) => {
                            this.accountService
                                .getAllSuits()
                                .pipe(first())
                                .subscribe((suits) => {
                                    this.products = suits;
                                    this.messageService.add({
                                        severity: "success",
                                        summary: "Successful",
                                        detail: message.toString(),
                                        life: 3000,
                                    });
                                });
                        },
                        error: (error) => {
                            this.messageService.add({
                                severity: "error",
                                summary: "Error",
                                detail: error,
                                life: 3000,
                            });
                        },
                    });
            }

            this.products = [...this.products];
            this.productDialog = false;
            this.product = { ...this.initializeProduct };
        }
    }

    findIndexById(id: number): number {
        let index = -1;
        for (let i = 0; i < this.products.length; i++) {
            if (this.products[i].id === Number(id)) {
                index = i;
                break;
            }
        }

        return index;
    }
}
