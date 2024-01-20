interface FooterInfoOptions {
    madeBy: string;
}

export class FooterInfo implements FooterInfoOptions {
    madeBy: string;
    year: number;

    constructor(madeBy: string) {
        this.madeBy = madeBy;
        this.year = new Date().getFullYear();
    }
}
