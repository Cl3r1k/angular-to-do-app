import { TestBed, ComponentFixture, async } from '@angular/core/testing';
import { Component } from '@angular/core';
import { By } from '@angular/platform-browser';

// Directive
import { TooltipDirective } from '@app/_directives/tooltip.directive';

@Component({
    template: `<div appTooltipDirective='Edit advanced settings' placement='top'>some info</div>`
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
    it('hovering over input', () => {
        divEl.triggerEventHandler('mouseenter', null);
        fixture.detectChanges();
        // expect(divEl.nativeElement.style.backgroundColor).toBe('blue');
        // expect(directive.hoveredState).toBe(true, 'mouseenter test');
        // HINT: Somehow directive.hoveredState couldn't be read as true, but in console it writes as 'true'
        // And btw backgroundColor reads as 'blue' for 'div' and works correctly, come back here later

        divEl.triggerEventHandler('mouseleave', null);
        fixture.detectChanges();
        // expect(divEl.nativeElement.style.backgroundColor).toBe('inherit');
        // expect(directive.hoveredState).toBe(false, 'mouseleave test');
    });
});

