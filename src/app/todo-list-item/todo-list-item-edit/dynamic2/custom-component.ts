import { EventEmitter } from '@angular/core';

export interface CustomComponent {
    data: any;

    updateEmitter: EventEmitter<number>;

    update(): void;
}
