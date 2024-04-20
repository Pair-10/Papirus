// communication.service.ts
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class CommunicationService {
    private materialTypeSubject = new Subject<string>();
    materialType$ = this.materialTypeSubject.asObservable();

    setMaterialType(type: string) {
        this.materialTypeSubject.next(type);
    }
}
