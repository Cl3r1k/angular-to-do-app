import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'parseTag'
})

export class ParseTagPipe implements PipeTransform {

    transform(title: string): string {
        return title + ' #someTagNamePiped';
    }
}
