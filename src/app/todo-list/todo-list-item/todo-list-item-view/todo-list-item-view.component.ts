import { Component, EventEmitter, Input, OnInit, Output, HostListener } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

import { ToDo } from '@app/_models/to-do';

import { CustomTodoComponentInterface } from '@app/_interfaces/custom-todo-component-interface';

@Component({
    selector: 'app-todo-list-item-view',
    templateUrl: './todo-list-item-view.component.html',
    styleUrls: ['./todo-list-item-view.component.scss']
})
export class TodoListItemViewComponent implements OnInit, CustomTodoComponentInterface {

    consoleTextColorComponent = 'color: cadetblue;';

    @Input() todo: ToDo;

    @Output()
    toggleCompleteTodoListItemEmitter: EventEmitter<ToDo> = new EventEmitter();

    @Output()
    editTodoListItemEmitter: EventEmitter<ToDo> = new EventEmitter();

    @Output()
    updateTodoListItemEmitter: EventEmitter<ToDo> = new EventEmitter();

    @Output()
    moreTodoListItemEmitter: EventEmitter<ToDo> = new EventEmitter();

    @Output()
    pinTodoListItemEmitter: EventEmitter<ToDo> = new EventEmitter();

    @Output()
    cancelTodoListItemEmitter: EventEmitter<boolean> = new EventEmitter();

    @Output()
    removeTodoListItemEmitter: EventEmitter<ToDo> = new EventEmitter();

    // TODO: Cleanup 'edit' code later
    // editHoverState = false;
    completeHoverState = false;
    // tslint:disable-next-line:max-line-length
    priorityColors = ['transparent', 'red', 'orange', 'tomato', 'royalblue', 'steelblue', 'skyblue', 'forestgreen', 'limegreen', 'mediumspringgreen', 'paleturquoise'];
    priorityColor = this.priorityColors[0];
    titleToView = '';
    hoverState = false;
    withCtrlHoverState = false;

    constructor(private sanitizer: DomSanitizer) { }

    ngOnInit() {
        this.titleToView = this.parseTitle(this.todo);
        // tslint:disable-next-line:max-line-length
        // console.log('%cparse in ngOnInit -> title: %s and priorityColor: ', this.consoleTextColorComponent, this.priorityColor);
    }

    @HostListener('document:keydown', ['$event']) onKeyDown(event: KeyboardEvent) {
        if (event.ctrlKey) {
            if (this.hoverState && !this.withCtrlHoverState) {
                // console.log('%cCtrl pressed: ', this.consoleTextColorComponent);
                this.withCtrlHoverState = true;
            }
        }
    }

    @HostListener('document:keyup', ['$event']) onKeyUp(event: KeyboardEvent) {
        if (event.keyCode === 17) {
            if (this.withCtrlHoverState) {
                // console.log('%cCtrl UNpressed: ', this.consoleTextColorComponent);
                this.withCtrlHoverState = false;
            }
        }
    }

    toggleTodoComplete(todo: ToDo) {
        this.toggleCompleteTodoListItemEmitter.emit(todo);
    }

    editTodo(todo: ToDo) {
        console.log('%ceditTodo called in TodoListItemViewComponent with title: ', this.consoleTextColorComponent, todo.title);
        this.editTodoListItemEmitter.emit(todo);    // Emit the 'edit' event to a Parent component
    }

    updateTodo(todo: ToDo) {
        //
    }

    showMore(todo: ToDo) {
        // tslint:disable-next-line:max-line-length
        console.log('showMore called in TodoListItemViewComponent with title: %s, and id: %c%s', todo.title, this.consoleTextColorComponent, todo.inner_id);
        this.moreTodoListItemEmitter.emit(todo);    // Emit the 'more' event to a Parent component
    }

    pinTodo(todo: ToDo) {
        // tslint:disable-next-line:max-line-length
        console.log('pinTodo called in TodoListItemViewComponent with title: %s, and id: %c%s', todo.title, this.consoleTextColorComponent, todo.inner_id);
        this.pinTodoListItemEmitter.emit(todo);    // Emit the 'pin' event to a Parent component
    }

    removeTodo(todo: ToDo) {
        // tslint:disable-next-line:max-line-length
        // console.log('%cremoveTodo emited event removeTodoListItemEmitter from TodoListItemViewComponent with title: ', this.consoleTextColorComponent, todo.title);
        this.removeTodoListItemEmitter.emit(todo);
    }

    // setEditHover(state: boolean) {
    //     this.editHoverState = state;
    // }

    setCompleteHover(completeHoverState: boolean) {
        this.completeHoverState = completeHoverState;
    }

    parseTitle(todo: ToDo) {

        let tmpTitle = todo.title;

        let foundPriority = false;
        let lastIndex: number;
        let counter = 0;

        for (let mainInd = tmpTitle.length - 1; mainInd >= 0; mainInd--) {
            lastIndex = tmpTitle.lastIndexOf('!', mainInd);

            if (lastIndex < 0) {
                break;    // '!' not found, skip parsing
            }

            if (lastIndex === tmpTitle.length - 1 || tmpTitle[lastIndex + 1] === ' ') {
                counter = 0;
                let notPriority = false;
                for (let i = lastIndex; i >= 0; i--) {
                    if (tmpTitle[i] === '!') {
                        counter++;
                        continue;
                    }
                    if (tmpTitle[i] === ' ') {
                        foundPriority = true;
                        break;
                    } else {
                        notPriority = true;
                        break;
                    }
                }

                if (foundPriority) {
                    break;
                }
            } else {
                continue;
            }
        }

        if (foundPriority) {
            // console.log('%clastIndex: ', this.consoleTextColorComponent, lastIndex);
            // console.log('%ccounter: ', this.consoleTextColorComponent, counter);
            this.priorityColor = this.priorityColors[counter > 10 ? 10 : counter];
            let tmpTitleParsed = tmpTitle.slice(0, lastIndex - counter);
            if (lastIndex < tmpTitle.length - 1) {
                tmpTitleParsed += tmpTitle.slice(lastIndex + 1, tmpTitle.length);
            }
            tmpTitle = tmpTitleParsed;
            // console.log('%ctmpTitleParsed: ', this.consoleTextColorComponent, tmpTitleParsed);
        }

        // tmpTitle = this.parseTitleByTags(tmpTitle);

        return tmpTitle;
    }

    // parseTitleByTags(title: string): string {
    //     const tagIndex = title.indexOf('#', 0);

    //     if (tagIndex < 0) {
    //         return title;    // '#' not found, skip parsing
    //     }

    //     console.log('%cin parseTitleByTags() title with #: ', this.consoleTextColorComponent, title);

    //     let tpmTitle = '';
    //     let inRow = false;
    //     let currentTag = '';
    //     for (let ind = 0; ind < title.length; ind++) {
    //         if (title[ind] === '#' && (ind === 0 || (ind - 1 > 0 && title[ind - 1] === ' '))) {
    //             inRow = true;
    //             continue;
    //         }

    //         if (inRow) {
    //             if (ind === title.length - 1 || title[ind] === ' ') {
    //                 if (ind === title.length - 1) {
    //                     currentTag += title[ind];
    //                     // tpmTitle += `<span #tagName class='tag-class' (click)='filterWithTag(tagName)'>#` + currentTag + `</span>`;
    //                     // const clickText = this.sanitizer.bypassSecurityTrustScript(`javascript:alert("Hi there")`);
    //                     // tpmTitle += `<span #tagName class='tag-class' (click)='` + clickText + `'>#` + currentTag + `</span>`;
    // tslint:disable-next-line:max-line-length
    //                     // tpmTitle += this.sanitizer.bypassSecurityTrustHtml(`<span #tagName class='tag-class' (click)='filterWithTag(tagName)'>#` + currentTag + `</span>`);
    //                     tpmTitle += `<span class='tag-class'>#` + currentTag + `</span>`;
    //                 } else {
    //                     // tpmTitle += `<span #tagName class='tag-class' (click)='filterWithTag(tagName)'>#` + currentTag + `</span>`;
    // tslint:disable-next-line:max-line-length
    //                     // tpmTitle += this.sanitizer.bypassSecurityTrustHtml(`<span #tagName class='tag-class' (click)='filterWithTag(tagName)'>#` + currentTag + `</span>`);
    //                     tpmTitle += `<span class='tag-class'>#` + currentTag + `</span>`;
    //                     tpmTitle += title[ind];
    //                 }
    //                 inRow = false;
    //                 currentTag = '';
    //             } else {
    //                 currentTag += title[ind];
    //             }
    //         } else {
    //             tpmTitle += title[ind];
    //         }
    //     }

    //     // TODO: Do not forget to delete or update next line
    //     tpmTitle = title;

    //     console.log('%cin parseTitleByTags() tpmTitle: ', this.consoleTextColorComponent, tpmTitle);

    //     return tpmTitle;
    // }

    filterWithTag(tagName: string) {
        console.log('%cin filterWithTag() tagName: ', this.consoleTextColorComponent, tagName);
    }

    setHoverState(hoverState: boolean) {
        this.hoverState = hoverState;

        if (!hoverState) {
            this.withCtrlHoverState = hoverState;
        }
    }

}
