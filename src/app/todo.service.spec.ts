import { TestBed, inject } from '@angular/core/testing';

import { ToDo } from './to-do';
import { TodoService } from './todo.service';

describe('TodoService', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [TodoService]
        });
    });

    it('should be created', inject([TodoService], (service: TodoService) => {
        expect(service).toBeTruthy();
    }));

    describe('#getAllTodos', () => {
        it('дожно возвращать пустой массив по умолчанию', inject([TodoService], (service: TodoService) => {
            // Arrange

            // Act

            // Assert
            expect(service.getAllTodos()).toEqual([]);
        }));

        it('должно возврщать все todos', inject([TodoService], (service: TodoService) => {
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
        it('должно автоматически назначать увелченный ID', inject([TodoService], (service: TodoService) => {
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
        it('должно удалять todo по соответствующему ID', inject([TodoService], (service: TodoService) => {
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

        it('не должно ничего удалять, если todo с соответствующим ID не найдено', inject([TodoService], (service: TodoService) => {
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
        it('должно возвращать todo с соответствующим ID и обновленными данными', inject([TodoService], (service: TodoService) => {
            // Arrange
            const todo1 = new ToDo({ title: 'Hello 1', complete: false });

            // Act
            service.addTodo(todo1);
            const updatedTodo = service.updateTodoById(1, { title: 'new title' });

            // Assert
            expect(updatedTodo.title).toEqual('new title');
        }));

        it('должно вернуть null, если todo не найден', inject([TodoService], (service: TodoService) => {
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
        it('должно вернуть обновленный todo с противополжным статусом', inject([TodoService], (service: TodoService) => {
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
