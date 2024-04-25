export interface ISelectItem {
    label: string,
    value: string,
}

export interface ICounty {
    countycode: string,
    countyname: string,
    countycode01: number,
}

export interface ITown {
    towncode: string,
    townname: string,
    towncode01: number,
}

export interface ISelectMap {
    [key: string]: ISelectItem[];
}