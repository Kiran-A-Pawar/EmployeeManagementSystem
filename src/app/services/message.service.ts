import { Injectable } from '@angular/core';
import * as Rx from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MessageService {
  private subjects : any = {};
  private messages: Map<string, any> = new Map<string, any>();

  private onLoad = true;

  constructor() {}

  publish(name: string, parameters?: any) {
    if (!this.subjects[name]) {
      this.subjects[name] = new Rx.BehaviorSubject({});
    }

    this.subjects[name].next(parameters);
  }

  subscribe(name: string, listener: (parameters?: any) => void): Rx.Subscription {
    if (!this.subjects[name]) {
      this.subjects[name] = new Rx.BehaviorSubject({});
    }

    let subscription = this.subjects[name].subscribe(listener);

    if (this.messages.get(name)) {
      this.subjects[name].next(this.messages.get(name));
    }

    return subscription;
  }
  
  publishWithSubject(name: string, parameters?: any) {
    if (!this.subjects[name]) {
      this.subjects[name] = new Rx.Subject();
    }

    this.subjects[name].next(parameters);
  }

  subscribeWithSubject(name: string, listener: (parameters?: any) => void): Rx.Subscription {
    if (!this.subjects[name]) {
      this.subjects[name] = new Rx.Subject();
    }

    return this.subjects[name].subscribe(listener);
  }

  unsubscribe(name: string) {
    this.subjects[name].unsubscribe();
    if(!this.subjects[name]?.observers){
      delete this.subjects[name];
    }
  }
}
