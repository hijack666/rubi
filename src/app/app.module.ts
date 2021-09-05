import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { NgbActiveModal, NgbModalRef, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ModalComponent } from './modal/modal.component';
import { FeedbackComponent } from './feedback/feedback.component';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MainService } from './service/main.service';

@NgModule({
  declarations: [
    AppComponent,
    ModalComponent,
    FeedbackComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    NgbModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [NgbActiveModal, FormBuilder, MainService ],
  bootstrap: [AppComponent]
})
export class AppModule { }
