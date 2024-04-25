export interface ICollection {
    set: Function,
    add: Function,
    get: Function,
    doc: Function,
}

export interface IDocument {
    id: string,
    exists: boolean,
    data: Function
}