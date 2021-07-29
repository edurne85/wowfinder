import { buildShape, Shape } from './Slot';

interface GearBuilder {
    shape: string[],
}

export default class Gear {
    private _shape: Shape;

    constructor({shape}: GearBuilder) {
        this._shape = buildShape(shape);
    }
}
