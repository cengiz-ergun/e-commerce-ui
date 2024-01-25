import { CurrencyPipe, NgClass, NgFor, NgIf } from "@angular/common";
import { Component, OnInit } from "@angular/core";
import { Size } from "@app/_models/enums/size";
import { SuitColour } from "@app/_models/enums/suit-colour";
import { Suit } from "@app/_models/suit";
import { AccountService } from "@app/_services/account.service";
import { FilterApplyService } from "@app/_services/filter-apply.service";
import { FilterByColourService } from "@app/_services/filter-by-colour.service";
import { FilterByPriceRangeService } from "@app/_services/filter-by-price-range.service";
import { FilterBySizeService } from "@app/_services/filter-by-size.service";
import { first } from "rxjs";
import { SkeletonModule } from "primeng/skeleton";
import { QuickViewService } from "@app/_services/quick-view.service";
import { ViewportScroller } from "@angular/common";

@Component({
    selector: "app-galery-items",
    standalone: true,
    imports: [NgIf, NgFor, SkeletonModule, CurrencyPipe, NgClass],
    templateUrl: "./galery-items.component.html",
    styleUrl: "./galery-items.component.scss",
})
export class GaleryItemsComponent implements OnInit {
    fetchedSuits: Suit[] = [];
    filteredSuits!: Suit[];
    paginatedSuits!: Suit[];

    rangeValues!: number[];
    colourValues!: SuitColour[];
    sizeValues!: Size[];

    mockArrayForSkeleton = Array.from(Array(6).keys());

    itemPerPagination = 6;
    currentPaginationIndex = 1;

    constructor(
        private filterByPriceRangeService: FilterByPriceRangeService,
        private filterByColourService: FilterByColourService,
        private filterBySizeService: FilterBySizeService,
        private filterApplyService: FilterApplyService,
        private accountService: AccountService,
        private quickViewService: QuickViewService,
        private viewportScroller: ViewportScroller
    ) {}
    ngOnInit(): void {
        this.accountService
            .getAllSuits()
            .pipe(first())
            .subscribe((suits) => {
                this.fetchedSuits = suits;
                this.filteredSuits = suits;
                this.updatePaginatedSuits(this.filteredSuits);
            });

        // Preparing filter properties(price range, colour, size) but not apply the filtering immediately.
        this.filterByPriceRangeService.rangeValues$.subscribe((values) => {
            this.rangeValues = values;
        });
        this.filterByColourService.colourValues$.subscribe((values) => {
            this.colourValues = values;
        });
        this.filterBySizeService.sizeValues$.subscribe((values) => {
            this.sizeValues = values;
        });

        // Applying all these prepared filters triggered here. By user to submit filter apply button(See FilterApplyComponent)
        this.filterApplyService.filterValue$.subscribe((value) => {
            // TODO: no need to check value actually. it is only action of user-clicking to the "apply filters" button.
            if (value) {
                const [minValue, maxValue] = this.rangeValues;

                this.filteredSuits = this.fetchedSuits.filter((fetchedSuit) => {
                    return (
                        fetchedSuit.price > minValue &&
                        fetchedSuit.price < maxValue &&
                        (this.colourValues.length != 0 ? this.colourValues.includes(fetchedSuit.colour) : true) &&
                        // (this.sizeValues.length != 0 ? suit.sizes.every((r) => this.sizeValues.includes(r)) : true)
                        (this.sizeValues.length != 0
                            ? fetchedSuit.sizes.some((r) => this.sizeValues.includes(r))
                            : true)
                    );
                });
                this.currentPaginationIndex = 1;

                this.updatePaginatedSuits(this.filteredSuits);

                this.filterApplyService.updateClickedState(false);
            }
        });
    }

    quickViewProduct(suit: Suit) {
        this.quickViewService.updateSelectedSuit(suit);
    }

    handlePreviousClick() {
        if (this.currentPaginationIndex !== 1) {
            this.currentPaginationIndex -= 1;
        }
        this.updatePaginatedSuits(this.filteredSuits);
    }

    handleNextClick() {
        if (this.currentPaginationIndex !== this.pageCount()) {
            this.currentPaginationIndex += 1;
        }
        this.updatePaginatedSuits(this.filteredSuits);
    }

    handlePageNumberClick(pageNumber: number) {
        this.currentPaginationIndex = pageNumber;
        this.updatePaginatedSuits(this.filteredSuits);
    }

    filteredSuitCount(): number {
        return this.filteredSuits.length;
    }

    pageCount(): number {
        const floor = Math.floor(this.filteredSuitCount() / this.itemPerPagination);
        const remainder = this.filteredSuitCount() % this.itemPerPagination;

        return remainder !== 0 ? floor + 1 : floor;
    }

    arrayBasedOnPageCount(): number[] {
        return Array.from(Array(this.pageCount()).keys()).map((number) => number + 1);
    }

    previousButtonIsDisabled(): boolean {
        return this.currentPaginationIndex === 1;
    }

    nextButtonIsDisabled(): boolean {
        return this.currentPaginationIndex === this.pageCount();
    }

    updatePaginatedSuits(filteredSuits: Suit[]) {
        this.paginatedSuits = filteredSuits.slice(
            (this.currentPaginationIndex - 1) * this.itemPerPagination,
            this.currentPaginationIndex * this.itemPerPagination
        );
    }
}
