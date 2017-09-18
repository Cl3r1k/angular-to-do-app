import { TestBed, async, inject } from '@angular/core/testing';

import { ToDo } from './to-do';
import { TodoService } from './todo.service';

describe('TodoService', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [TodoService]
        });
    });

    it('Should be created', inject([TodoService], (service: TodoService) => {
        expect(service).toBeTruthy();
    }));

    describe('#getAllTodos', () => {
        it('Should return an empty array by default', inject([TodoService], (service: TodoService) => {
            // Arrange

            // Act

            // Assert
            expect(service.getAllTodos()).toEqual([]);
        }));

        it('Should return all todos', inject([TodoService], (service: TodoService) => {
            // Arrange
            const todo1 = new ToDo({ title: 'Hello 1', complete: false });
            const todo2 = new ToDo({ title: 'Hello 2', complete: true });

            // Act
            service.addTodo(todo1);
            service.addTodo(todo2);

            // Assert
            expect(service.getAllTodos()).toEqual([todo1, todo2]);
        }));
    });

    describe('#save(todo)', () => {
        it('Should automatically assign an incrementing id', inject([TodoService], (service: TodoService) => {
            // Arrange
            const todo1 = new ToDo({ title: 'Hello 1', complete: false });
            const todo2 = new ToDo({ title: 'Hello 2', complete: true });

            // Act
            service.addTodo(todo1);
            service.addTodo(todo2);

            // Assert
            expect(service.getTodoById(1)).toEqual(todo1);
            expect(service.getTodoById(2)).toEqual(todo2);
        }));
    });

    describe('#deleteTodoById(id)', () => {
        it('Should remove todo with the corresponding ID', inject([TodoService], (service: TodoService) => {
            // Arrange
            const todo1 = new ToDo({ title: 'Hello 1', complete: false });
            const todo2 = new ToDo({ title: 'Hello 2', complete: true });

            // Act
            service.addTodo(todo1);
            service.addTodo(todo2);

            // Assert
            expect(service.getAllTodos()).toEqual([todo1, todo2]);
            service.deleteTodoById(1);
            expect(service.getAllTodos()).toEqual([todo2]);
            service.deleteTodoById(2);
            expect(service.getAllTodos()).toEqual([]);
        }));

        it('Should not remove anything if todo with corresponding id is not found', inject([TodoService], (service: TodoService) => {
            // Arrange
            const todo1 = new ToDo({ title: 'Hello 1', complete: false });
            const todo2 = new ToDo({ title: 'Hello 2', complete: true });

            // Act
            service.addTodo(todo1);
            service.addTodo(todo2);

            // Assert
            expect(service.getAllTodos()).toEqual([todo1, todo2]);
            service.deleteTodoById(3);
            expect(service.getAllTodos()).toEqual([todo1, todo2]);
        }));
    });

    describe('#updateTodoById(id)', () => {
        it('Should return todo with the corresponding id and updated data', inject([TodoService], (service: TodoService) => {
            // Arrange
            const todo1 = new ToDo({ title: 'Hello 1', complete: false });

            // Act
            service.addTodo(todo1);
            const updatedTodo = service.updateTodoById(1, { title: 'new title' });

            // Assert
            expect(updatedTodo.title).toEqual('new title');
        }));

        it('Should return null, if todo is not found', inject([TodoService], (service: TodoService) => {
            // Arrange
            const todo = new ToDo({ title: 'Hello 1', complete: false });

            // Act
            service.addTodo(todo);
            const updatedTodo = service.updateTodoById(2, { title: 'new title' });

            // Assert
            expect(updatedTodo).toEqual(null);
        }));
    });

    describe('#toggleTodoComplete(id)', () => {
        it('Should return updated todo with inverse complete status', inject([TodoService], (service: TodoService) => {
            // Arrange
            const todo = new ToDo({ title: 'Hello 1', complete: false });

            // Act
            service.addTodo(todo);
            let updatedTodo = service.toggleTodoComplete(todo);

            // Assert
            expect(updatedTodo.complete).toEqual(true);
            updatedTodo = service.toggleTodoComplete(todo);
            expect(updatedTodo.complete).toEqual(false);
        }));
    });
});
