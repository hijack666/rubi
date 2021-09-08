import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { from, Observable, pipe } from 'rxjs';
import { finalize, tap } from 'rxjs/operators';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FeedbackComponent } from './feedback/feedback.component';
import { MainService } from './service/main.service';

@UntilDestroy()
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less'],
  encapsulation: ViewEncapsulation.None
})
export class AppComponent implements OnInit {

  mainUrl: string = 'http://dev.planyway.com/app-changelog/';
  list: any = [];
  loader: boolean = false;

  constructor(
    private modalService: NgbModal,
    private mainService: MainService,
  ) {}

  ngOnInit(): void {
    this.getList();
  }

  getList(): void {
    this.loader = true;
    this.mainService.getList(this.mainUrl)
      .pipe(
        tap((data) => this.list = data, untilDestroyed(this)),
        finalize(() => this.loader = false))
        .subscribe();
  }

  feedback(): void {
    this.modalService.open(FeedbackComponent);
  }

  trackByFn(index, item) {
    return item.title;
  }
}
