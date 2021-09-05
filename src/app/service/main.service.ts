import { HttpClient, HttpHeaders } from '@angular/common/http';
import {Injectable} from '@angular/core';
import { Observable } from 'rxjs';
import { finalize, tap } from 'rxjs/operators';

@Injectable()
export class MainService {

    constructor(
        private http: HttpClient
    ){}

    getList(mainUrl): Observable<any> {
        return this.http.get(mainUrl + 'app-changelog.json', )
          .pipe(
            tap((data) => {
              return data;
            }),
          );
    }

    send(url): Observable<any> {
        return this.http.get(url)
            .pipe(
                tap((urlData: any) => {
                    return urlData;
                }),
            );
    }

    sendData(url: string, form: any, appType, appVersion): Observable<any> {
        const headers = new HttpHeaders({ 'x-ms-blob-type': 'BlockBlob' });
        return this.http.put(url, {
            memberName: form.value.memberName,
            memberEmail: form.value.memberEmail,
            appType,
            appVersion,
            message: form.value.message,
        }, { headers, observe: 'response' });
            // .pipe(
                // untilDestroyed(this)
            // )
            // .subscribe(resp => {
            //     if (resp.status === 201) {
            //         this.messageSended = true;
            //         setTimeout(this.activeModal.close, 5000);
            //     }
            // });
    }
}
