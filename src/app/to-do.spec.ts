import { TestBed, async } from '@angular/core/testing';

import { ToDo } from './to-do';


describe('ToDo', () => {
    it('Должно создать экземпляр класса', () => {

        // Arrange

        // Act

        // Assert
        expect(new ToDo()).toBeTruthy();
    });

    it('Должно принять значения в конструктор', () => {

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
