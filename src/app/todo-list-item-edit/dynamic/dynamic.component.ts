import { Component, ComponentFactoryResolver, Input, ReflectiveInjector, ViewChild, ViewContainerRef } from '@angular/core';
import { HelloWorldComponent } from './../hello-world/hello-world.component';
import { WorldHelloComponent } from './../world-hello/world-hello.component';

@Component({
    selector: 'app-dynamic-component',
    templateUrl: './dynamic.component.html',
    styleUrls: ['./dynamic.component.css'],
    entryComponents: [HelloWorldComponent, WorldHelloComponent] // Reference to the comp-s must be here in order to dynamically create them
})
export class DynamicComponent {

    currentComponent = null;

    @ViewChild('dynamicComponentContainer', { read: ViewContainerRef }) dynamicComponentContainer: ViewContainerRef;

    @Input() set componentData(data: { component: any, inputs: any }) {
        if (!data) {
            return;
        }

        // Inputs need to be in the following format to be resolved properly
        const inputProviders = Object.keys(data.inputs).map((inputName) => {
            return { provide: inputName, useValue: data.inputs[inputName] };
        });
        const resolvedInputs = ReflectiveInjector.resolve(inputProviders);

        // We create an injector out of the data we want to pass down and this components injector
        const injector = ReflectiveInjector.fromResolvedProviders(resolvedInputs, this.dynamicComponentContainer.parentInjector);

        // We create a factory out of the component we want to create
        const factory = this._resolver.resolveComponentFactory(data.component);

        // We create the component using the factory and the injector
        const component = factory.create(injector);

        // We insert the component into the dom container
        this.dynamicComponentContainer.insert(component.hostView);

        // Destroy the previosly created component
        if (this.currentComponent) {
            this.currentComponent.destroy();
        }

        this.currentComponent = component;
    }

    constructor(private _resolver: ComponentFactoryResolver) { }

}
