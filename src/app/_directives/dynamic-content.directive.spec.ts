import { TestBed, ComponentFixture, async } from '@angular/core/testing';
import { Component } from '@angular/core';
import { By } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';

// Directive
import { DynamicContentDirective } from '@app/_directives/dynamic-content.directive';

@Component({
    template: `<div class='tag-class' appDynamicContentDirective>some #hashtag</div>`
})
class TestDynamicContentDirectiveComponent {
    //
}

describe(`Directive: DynamicContentDirective`, () => {

    let directive: DynamicContentDirective;
    let component: TestDynamicContentDirectiveComponent;
    let fixture: ComponentFixture<TestDynamicContentDirectiveComponent>;
    let divEl;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [RouterTestingModule],
            declarations: [DynamicContentDirective, TestDynamicContentDirectiveComponent],
            providers: []
        });

        fixture = TestBed.createComponent(TestDynamicContentDirectiveComponent);
        component = fixture.componentInstance;

        divEl = fixture.debugElement.query(By.css('div'));    // Find div.tag-class element

        directive = new DynamicContentDirective(divEl.nativeElement, null, null);
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

});
