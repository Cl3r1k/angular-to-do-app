import { TestBed, async } from '@angular/core/testing';

import { ResolverData } from '@app/_models/resolver-data';


describe(`Model: ResolverData`, () => {
    it(`Should create an instance (async)`, async(() => {
        // Arrange

        // Act

        // Assert
        expect(new ResolverData(0, '')).toBeTruthy();
    }));

    // it(`Should accept values in the constructor (async)`, async(() => {
    //     // Arrange
    //     let todo: ToDo;

    //     // Act
    //     todo = new ToDo( {
    //         title: 'Hello',
    //         complete: true
    //     });

    //     // Assert
    //     expect(todo.title).toEqual('Hello');
    //     expect(todo.complete).toEqual(true);
    // }));

    // it(`Should have initial vaules after init (async)`, async(() => {
    //     // Arrange
    //     let todo: ToDo;

    //     // Act
    //     todo = new ToDo( {
    //         title: 'Hello',
    //         complete: true
    //     });

    //     // Assert
    //     expect(todo.id).toEqual(undefined);
    //     expect(todo.title).toEqual('Hello');
    //     expect(todo.complete).toEqual(true);
    //     expect(todo.pin).toEqual(false);
    //     expect(todo.costedPomo).toEqual(0);
    //     expect(todo.estimatedPomos).toEqual(0);
    //     expect(todo.remindMe).toEqual(false);
    //     expect(todo.remindTime).toBeNull();
    //     expect(todo.note).toBeNull();
    // }));

    // it(`Should have not null 'created_time' and null other times after init (async)`, async(() => {
    //     // Arrange
    //     let todo: ToDo;

    //     // Act
    //     todo = new ToDo( {
    //         title: 'Hello',
    //         complete: true
    //     });

    //     // Assert
    //     expect(todo.created_time).toBeTruthy();
    //     expect(todo.completed_time).toBeNull();
    //     expect(todo.updated_time).toBeNull();
    //     expect(todo.deleted_time).toBeNull();
    // }));

    // it(`Should have not null 'inner_id' with length=36 after init (async)`, async(() => {
    //     // Arrange
    //     let todo: ToDo;

    //     // Act
    //     todo = new ToDo( {
    //         title: 'Hello',
    //         complete: true
    //     });

    //     // Assert
    //     expect(todo.inner_id).toBeTruthy();
    //     expect(todo.inner_id.length).toEqual(36);
    // }));
});
