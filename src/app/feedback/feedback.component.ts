import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { tap } from 'rxjs/operators';
import { MainService } from '../service/main.service';

@UntilDestroy()
@Component({
  templateUrl: './feedback.component.html',
  styleUrls: ['./feedback.component.less']
})
export class FeedbackComponent implements OnInit {
    mainUrl = 'https://dev.planyway.com/api/b/feedback/link';
    appType: string = 'Site';
    appVersion: string = '1.0.0.0';

    loader: boolean = false;
    /** Сообщение отправлено */
    messageSended: boolean = false;

    /** Форм-группа */
    supportForm: FormGroup = new FormGroup({
        memberName: new FormControl(''),
        memberEmail: new FormControl(''),
        message: new FormControl(''),
    });

    constructor(
        private http: HttpClient,
        public activeModal: NgbActiveModal,
        private mainService: MainService,
    ) {}

    ngOnInit(): void {
    }

    send(): void {
        this.loader = true;
        this.mainService.send(this.mainUrl).pipe(
            tap((url: any) => {
                this.sendData(url.data);
            },
            untilDestroyed(this))
        ).subscribe();
    }

    sendData(url: string): void {
        this.mainService.sendData(url, this.supportForm, this.appType, this.appVersion)
            .pipe(untilDestroyed(this))
            .subscribe(resp => {
                if (resp.status === 201) {
                    this.messageSended = true;
                    setTimeout(this.activeModal.close, 5000);
                }
            });
    }

    isControlInvalid(controlName: string): boolean {
        const control = this.supportForm.controls[controlName];
        const result = control.invalid && control.touched;
        return result;
    }

    cancel(): void {
        this.activeModal.close();
    }
}
