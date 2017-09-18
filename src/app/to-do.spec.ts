import { TestBed, async } from '@angular/core/testing';

import { ToDo } from './to-do';


describe('ToDo', () => {
    it('Should create an instance', () => {
        // Arrange

        // Act

        // Assert
        expect(new ToDo()).toBeTruthy();
    });

    it('Should accept values in the constructor', () => {
        // Arrange
        let todo: ToDo;

        // Act
        todo = new ToDo( {
            title: 'Hello',
            complete: true
        });

        // Assert
        expect(todo.title).toEqual('Hello');
        expect(todo.complete).toEqual(true);

    });
});
