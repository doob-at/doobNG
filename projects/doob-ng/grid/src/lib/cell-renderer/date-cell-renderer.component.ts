import { Component } from '@angular/core';
import { ICellRendererAngularComp } from '@ag-grid-community/angular';
import { ICellRendererParams } from '@ag-grid-community/core';

@Component({
    selector: 'db-date-cell',
    template: `
    <div>
        <span>{{date | date:'dd.MM.y HH:mm' }}</span><span *ngIf="showSeconds" class="seconds"> {{date | date:'ss' }}</span>
    </div>`,
    styles: [
        `
        .seconds {
            font-size: 0.8em;
            color: #797979;
        }
        `
    ]
})
export class DoobDateCellRendererComponent implements ICellRendererAngularComp {

    public date: Date;
    public showSeconds: boolean;

    agInit(params: ICellRendererParams): void {
        this.getValueToDisplay(params);

        const showSeconds = params['showSeconds'];
        this.showSeconds = !!showSeconds

    }

    refresh(params: ICellRendererParams): boolean {
        this.getValueToDisplay(params);
        return false;
    }

    getValueToDisplay(params: ICellRendererParams) {
        this.date = params.value;
    }

}
