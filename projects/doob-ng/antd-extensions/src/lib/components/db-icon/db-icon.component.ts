import { Input, Component, ChangeDetectionStrategy } from "@angular/core";
import { BehaviorSubject, combineLatest } from "rxjs";
import { map } from "rxjs/operators";

@Component({
    selector: 'db-icon',
    template: `
    <ng-container *ngIf="(iconProps$ | async); let ico">
    <i *ngIf="ico.type == 'ant'" nz-icon [nzType]="ico.icon" [nzTheme]="ico.theme" style="width:inherit" [nzRotate]="ico.rotate"></i>
    <fa-icon *ngIf="ico.type == 'fa'" nz-icon [icon]="ico.icon" style="width:inherit" [rotate]="ico.rotate"></fa-icon>
    </ng-container>
    `,
    styles: [
        `
    :host {
        display: inline-grid
    }
    `
    ],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class DoobIconComponent {


    // private typeSubject$ = new BehaviorSubject<string>('');
    private themeSubject$ = new BehaviorSubject<string>('');
    private rotateSubject$ = new BehaviorSubject<number>(0);
    private iconSubject$ = new BehaviorSubject<string>('');

    // @Input()
    // set type(value: "ant" | "fa") {
    //     if (value == "ant" || value || "fa") {
    //         this.typeSubject$.next(value);
    //     } else {
    //         this.typeSubject$.next("ant");
    //     }
    // }

    @Input()
    set theme(value: string) {
        this.themeSubject$.next(value);
    }

    @Input()
    set rotate(value: number) {
        this.rotateSubject$.next(value);
    }

    @Input()
    set icon(value: string) {
        this.iconSubject$.next(value);
    }


    public iconProps$ = combineLatest([ this.themeSubject$, this.rotateSubject$, this.iconSubject$]).pipe(
        map(([theme, rotate, icon]) => {

            
            if(!icon) {
                return null;
            }
            var ico = icon;
            const iProp = new IconProps();
            iProp.theme = theme;
            iProp.rotate = rotate;

            
            if (ico.startsWith('fa#')) {
                iProp.type = "fa";
                ico = ico.substring(3);

                if (ico.includes('|')) {
                    iProp.icon = ico.split('|')
                } else {
                    iProp.icon = ico;
                }

            } else {
                iProp.type = "ant",
                iProp.icon = ico;
            }
            return iProp;
        })
    );
   
}


class IconProps {
    type: string;
    icon: any;
    theme: any;
    rotate: any;
}