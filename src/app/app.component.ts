import { Component } from '@angular/core';
import { SwPush, SwUpdate, UnrecoverableStateEvent, VersionEvent, VersionReadyEvent } from '@angular/service-worker';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'EmployeesManagementSystem';
  constructor(
    private updateService: SwUpdate,
    private pushService: SwPush,
  ) {}

  ngOnInit() {
    console.log('AppComponent.ngOnInit');
    if (!this.updateService.isEnabled) {
      console.log('AppComponent.ngOnInit: Service Worker is not enabled');
      return;
    }
    if (this.updateService.isEnabled) {
      console.log('AppComponent.ngOnInit: Service Worker is enabled');
      this.handleUpdates();
    }
  }

  handleUpdates() {
    this.updateService.versionUpdates.subscribe((event: VersionEvent) => {
      console.log(event);
      alert(event.type);
      if (
        event.type === 'VERSION_READY' &&
        confirm(
          `New version ${
            (event as VersionReadyEvent).latestVersion.hash
          } available. Load New Version?`
        )
      ) {
        window.location.reload();
      }
    });

    this.updateService.unrecoverable.subscribe(
      (event: UnrecoverableStateEvent) => {
        alert('Error reason : ' + event.reason);
      }
    );
  }
}
