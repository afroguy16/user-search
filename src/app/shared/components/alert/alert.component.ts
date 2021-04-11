import { Component, Input, OnInit } from "@angular/core";
import { AlertEnums } from "../../enums/alert";
import { AlertConfig } from "../../types/alert";
import { includes, isEmpty } from 'lodash';
import { AlertService } from "../../services/alert.service";

const ERROR_WRONG_TYPE = 'Use type AlertConfig for alert config';
const ERROR_BLANK_PROP = 'Alert requires a config prop';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.scss']
})

export class AlertComponent implements OnInit {
  @Input() config: AlertConfig;
  error: string;

  constructor(private alertService: AlertService) {}

  ngOnInit(): void {
    this.validateConfigType(this.config);
  }
  
  // A little validation to help developers use the right config type. Message could be made more explicit for different types of errors.
  // I am not sure if angular comes with built in prop check, that would be nice to see
  validateConfigType(data: unknown): void {
    if (!data && isEmpty(data)) {
      this.error = ERROR_BLANK_PROP
      throw new Error(this.error);
    }
    if(this.isConfigType(data)) {
      return
    }
    this.error = ERROR_WRONG_TYPE
    throw new Error(this.error);
  }

  isConfigType(data: unknown): data is AlertConfig {
    return (
      (data as AlertConfig).type !== undefined &&
      includes(AlertEnums, (data as AlertConfig).type) &&
      (data as AlertConfig).message !== undefined &&
      typeof (data as AlertConfig).message === 'string'
    );
  }

  close(): void {
    this.alertService.close();
  }
}
