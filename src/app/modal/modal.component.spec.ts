import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalComponent } from './modal.component';
import { ModalService } from '@app/_services/modal.service';

describe('ModalComponent', () => {
    let component: ModalComponent;
    let fixture: ComponentFixture<ModalComponent>;
    let dialogCloseBtnEl;
    let modalOverlayEl;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ModalComponent],
            providers: [ModalService]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ModalComponent);
        component = fixture.componentInstance;
        dialogCloseBtnEl = fixture.debugElement.nativeElement.querySelector('.dialog__close-btn');       // Find close button element
        modalOverlayEl = fixture.debugElement.nativeElement.querySelector('.modal-overlay');             // Find div overlay element

        component.modalId = 'testId';
        component.modalTitle = '';
        fixture.detectChanges();
    });

    it(`should create an instance of 'ModalComponent' (async)`, async(() => {
        // Arrange

        // Act

        // Assert
        expect(component).toBeTruthy();
    }));

    describe(`#close`, () => {
        it(`should call method 'close()' and set 'isOpen' to false (async)`, async(() => {
            // Arrange
            component.isOpen = true;

            // Act
            component.close();

            // Assert
            expect(component.isOpen).toEqual(false);
        }));
    });

    // TODO: Test Hostlistener

    describe(`#view tests`, () => {
        it(`clicking on button.dialog__close-btn should call method 'close()' (async)`, async () => {
            // Arrange

            // Act
            spyOn(component, 'close');
            dialogCloseBtnEl.click();

            // Assert
            fixture.whenStable().then(() => {
                expect(component.close).toHaveBeenCalled();
            });
        });

        it(`clicking on div.modal-overlay (outside of the modal) should call method 'close()' (async)`, async () => {
            // Arrange

            // Act
            spyOn(component, 'close');
            modalOverlayEl.click();

            // Assert
            fixture.whenStable().then(() => {
                expect(component.close).toHaveBeenCalled();
            });
        });

        it(`pressing 'Esc' should call method 'close()' (async)`, async () => {
            // Arrange
            const keyUpEscapeEvent = new KeyboardEvent('keyup', {
                'key': 'Escape'
            });
            Object.defineProperty(keyUpEscapeEvent, 'keyCode', { 'value': 27 });

            // Act
            spyOn(component, 'close');

            // Set input value focus lost
            window.dispatchEvent(keyUpEscapeEvent);
            fixture.detectChanges();

            // Assert
            fixture.whenStable().then(() => {
                expect(component.close).toHaveBeenCalled();
            });
        });
    });
});
