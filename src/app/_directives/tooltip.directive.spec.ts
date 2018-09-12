import { TestBed, ComponentFixture, async } from '@angular/core/testing';
import { Component } from '@angular/core';
import { By } from '@angular/platform-browser';

// Directive
import { TooltipDirective } from '@app/_directives/tooltip.directive';

@Component({
    template: `<div appTooltipDirective='Edit advanced settings' placement='top' delay='500'>some info</div>`
})
class TestTooltipDirectiveComponent {
    //
}

describe(`Directive: TooltipDirective`, () => {

    let directive: TooltipDirective;
    let component: TestTooltipDirectiveComponent;
    let fixture: ComponentFixture<TestTooltipDirectiveComponent>;
    let divEl;

    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [TooltipDirective, TestTooltipDirectiveComponent],
            providers: []
        });

        fixture = TestBed.createComponent(TestTooltipDirectiveComponent);
        component = fixture.componentInstance;

        divEl = fixture.debugElement.query(By.css('div'));    // Find div element

        directive = new TooltipDirective(divEl.nativeElement, null);
    });

    it(`create an instance`, () => {
        // Arrange

        // Act

        // Assert
        expect(directive).toBeTruthy();
    });

    it(`should have initial params`, () => {
        // Arrange

        // Act

        // Assert
        expect(directive.offset).toEqual(10);
        expect(directive.isHidePending).toEqual(false);
    });

    // TODO: Test mouseevents for direcive
    it(`hovering on element`, () => {
        // Arrange

        // Act
        divEl.triggerEventHandler('mouseenter', null);
        fixture.detectChanges();

        // Assert
        fixture.whenStable().then(() => {
            // expect(directive.hovered).toEqual(true);
        });
    });
});

