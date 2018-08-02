import { TestBed, ComponentFixture } from '@angular/core/testing';
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

        divEl = fixture.debugElement.query(By.css('div'));    // Find div.todoTitle element

        // TODO: replace param 'null' to proper param, and complete tests
        // Examples are here: https://codecraft.tv/courses/angular/unit-testing/directives/
        // and here: https://stackoverflow.com/questions/36432407/how-to-unit-test-a-directive-in-angular-2
        // Test ElementRef
        // look here: https://stackoverflow.com/questions/38623065/angular2-inject-elementref-in-unit-test
        directive = new DynamicContentDirective(null, null);
    });

    it(`create an instance`, () => {
        // Arrange

        // Act

        // Assert
        expect(directive).toBeTruthy();
    });
});
