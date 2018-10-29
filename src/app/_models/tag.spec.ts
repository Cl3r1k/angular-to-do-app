import { TestBed, async } from '@angular/core/testing';

import { Tag } from '@app/_models/tag';


describe(`Model: Tag`, () => {
    it(`Should create an instance (async)`, async(() => {
        // Arrange

        // Act

        // Assert
        expect(new Tag('testTagName')).toBeTruthy();
    }));

    it(`Should accept values in the constructor (async)`, async(() => {
        // Arrange
        let hashTag: Tag;

        // Act
        hashTag = new Tag('testTagName1');

        // Assert
        expect(hashTag.tagName).toEqual('testTagName1');
    }));

    it(`Should have initial vaules after init (async)`, async(() => {
        // Arrange
        let hashTag: Tag;

        // Act
        hashTag = new Tag('testTagName2');

        // Assert
        expect(hashTag.id).toEqual(undefined);
        expect(hashTag.tagName).toEqual('testTagName2');
        expect(hashTag.color).toEqual('red');
        expect(hashTag.readyToDelete).toEqual(false);
    }));

    it(`Should have not null 'created_time' and null other times after init (async)`, async(() => {
        // Arrange
        let hashTag: Tag;

        // Act
        hashTag = new Tag('testTagName3');

        // Assert
        expect(hashTag.created_time).toBeTruthy();
        expect(hashTag.updated_time).toBeNull();
    }));
});
