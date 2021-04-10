import { ApplicationRef, ComponentFactoryResolver, ComponentRef, EmbeddedViewRef, Injectable, Injector } from '@angular/core';
import { AlertComponent } from '../components/alert/alert.component';
import { AlertConfig } from '../types/alert';

@Injectable({
  providedIn: 'root'
})
export class AlertService {
  alertComponentRef: ComponentRef<AlertComponent>

  constructor(
    private componentFactoryResolver: ComponentFactoryResolver,
    private appRef: ApplicationRef,
    private injector: Injector
  ) { }

  private appendAlertComponentToBody(config: AlertConfig) {
    const alertComponentFactory = this.componentFactoryResolver.resolveComponentFactory(AlertComponent);
    const componentRef = alertComponentFactory.create(this.injector);
    componentRef.instance.config = config;
    this.appRef.attachView(componentRef.hostView);

    const domElem = (componentRef.hostView as EmbeddedViewRef<any>).rootNodes[0] as HTMLElement;
    document.body.appendChild(domElem);

    this.alertComponentRef = componentRef;
  }

  private removeDialogComponentFromBody() {
    this.appRef.detachView(this.alertComponentRef.hostView);
    this.alertComponentRef.destroy();
  }

  open(config: AlertConfig): void {
      this.appendAlertComponentToBody(config);
      // In a real app, this will definitely be handled from the outside, e.g the configuration
      setTimeout(() => {
        this.close();
      }, 2000)
  }

  close(): void {
    this.removeDialogComponentFromBody();
  }
}
