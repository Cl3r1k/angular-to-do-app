import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { By } from '@angular/platform-browser';

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
            providers: [ModalService],
            imports: [BrowserAnimationsModule]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ModalComponent);
        component = fixture.componentInstance;

        component.modalId = 'testId';
        component.modalTitle = '';
        component.isOpen = true;
        component.modalTitle = 'Somet title';
        component.blocking = false;
        fixture.detectChanges();

        modalOverlayEl = fixture.debugElement.nativeElement.querySelector('.modal-overlay');             // Find div overlay element
        // Applyed By.css - with querySelector view test fails
        dialogCloseBtnEl = fixture.debugElement.query(By.css('.dialog__close-btn'));       // Find close button element

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
            if (dialogCloseBtnEl instanceof HTMLElement) {
                dialogCloseBtnEl.click();
            } else {
                dialogCloseBtnEl.triggerEventHandler('click', { button: 0 });
            }

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
            component.isOpen = true;
            const keyUpEscapeEvent = new KeyboardEvent('keyup', {
                'key': 'Escape'
            });
            Object.defineProperty(keyUpEscapeEvent, 'keyCode', { 'value': 27 });

            // Act
            spyOn(component, 'close');

            // Call Escape event on document
            document.dispatchEvent(keyUpEscapeEvent);
            fixture.detectChanges();

            // Assert
            fixture.whenStable().then(() => {
                expect(component.close).toHaveBeenCalled();
            });
        });
    });
});
