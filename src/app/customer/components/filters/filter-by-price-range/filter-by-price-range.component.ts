import { Component, OnInit } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { SliderModule } from "primeng/slider";
import { FILTER_PRICE_RANGE_MIN as minValueLimit } from "@app/_models/consts";
import { FILTER_PRICE_RANGE_MAX as maxValueLimit } from "@app/_models/consts";
import { FilterByPriceRangeService } from "@app/_services/app/filter.service";

@Component({
    selector: "app-filter-by-price-range",
    standalone: true,
    imports: [SliderModule, FormsModule],
    templateUrl: "./filter-by-price-range.component.html",
    styleUrl: "./filter-by-price-range.component.scss",
})
export class FilterByPriceRangeComponent implements OnInit {
    minValueLimit: number;
    maxValueLimit: number;
    rangeValues: number[];
    constructor(private filterByPriceRangeService: FilterByPriceRangeService) {
        this.minValueLimit = minValueLimit;
        this.maxValueLimit = maxValueLimit;
        this.rangeValues = [this.minValueLimit, this.maxValueLimit];
    }
    ngOnInit() {
        this.onRangeValuesChange();
    }

    onRangeValuesChange() {
        this.filterByPriceRangeService.updateValues(this.rangeValues);
    }
}
