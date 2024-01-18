import { NgFor, NgIf } from "@angular/common";
import { Component, OnInit } from "@angular/core";
import { Size } from "@app/_models/enums/size";
import { SuitColour } from "@app/_models/enums/suit-colour";
import { Suit } from "@app/_models/suit";
import { FilterApplyService } from "@app/_services/filter-apply.service";
import { FilterByColourService } from "@app/_services/filter-by-colour.service";
import { FilterByPriceRangeService } from "@app/_services/filter-by-price-range.service";
import { FilterBySizeService } from "@app/_services/filter-by-size.service";
import { mockData as suits } from "@assets/mock-data";

@Component({
    selector: "app-galery-items",
    standalone: true,
    imports: [NgIf, NgFor],
    templateUrl: "./galery-items.component.html",
    styleUrl: "./galery-items.component.scss",
})
export class GaleryItemsComponent implements OnInit {
    suits!: Suit[];

    rangeValues!: number[];
    colourValues!: SuitColour[];
    sizeValues!: Size[];

    constructor(
        private filterByPriceRangeService: FilterByPriceRangeService,
        private filterByColourService: FilterByColourService,
        private filterBySizeService: FilterBySizeService,

        private filterApplyService: FilterApplyService
    ) {
        this.suits = suits;
    }
    ngOnInit(): void {
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
            // TODO: no need to check value actually
            if (value) {
                const [minValue, maxValue] = this.rangeValues;

                this.suits = suits.filter((suit) => {
                    return (
                        suit.price > minValue &&
                        suit.price < maxValue &&
                        (this.colourValues.length != 0 ? this.colourValues.includes(suit.colour) : true) &&
                        // (this.sizeValues.length != 0 ? suit.sizes.every((r) => this.sizeValues.includes(r)) : true)
                        (this.sizeValues.length != 0 ? suit.sizes.some((r) => this.sizeValues.includes(r)) : true)
                    );
                });

                this.filterApplyService.updateClickedState(false);
            }
        });
    }
}
