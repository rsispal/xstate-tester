export enum HomeAutomationDeviceType {
  UNKNOWN,
  MAINS_SWITCH,
  LIGHT_SWITCH,
  THERMOSTAT,
  TEMPERATURE_HUMIDITY_SENSOR,
  SMOKE_HEAT_SENSOR,
}
export interface HomeAutomationDevice {
  id: string;
  name: string;
  room: string;
  type: HomeAutomationDeviceType;
  status: any;
  lastUpdate: number;
}

export interface MainsSwitchDevice extends HomeAutomationDevice {
  type: HomeAutomationDeviceType.MAINS_SWITCH;
  status: boolean;
}

export interface LightSwitchDevice extends HomeAutomationDevice {
  type: HomeAutomationDeviceType.LIGHT_SWITCH;
  status: boolean;
}

export interface ThermostatDevice extends HomeAutomationDevice {
  type: HomeAutomationDeviceType.THERMOSTAT;
  status: {
    ambientTemperature: number;
    targetTemperature: number;
    isOn: boolean;
  };
}

export interface TemperatureHumiditySensorDevice extends HomeAutomationDevice {
  type: HomeAutomationDeviceType.TEMPERATURE_HUMIDITY_SENSOR;
  status: {
    temperature: number;
    humidity: number;
  };
}

export interface SmokeHeatSensorDevice extends HomeAutomationDevice {
  type: HomeAutomationDeviceType.SMOKE_HEAT_SENSOR;
  status: {
    smokeLevel: "NORMAL" | "ALARM" | "FAULT";
    heatLevel: "NORMAL" | "ALARM" | "FAULT";
  };
}

export type SupportedHomeAutomationDevice =
  | MainsSwitchDevice
  | LightSwitchDevice
  | ThermostatDevice
  | TemperatureHumiditySensorDevice
  | SmokeHeatSensorDevice;

export interface HomeAutomationState {
  devices: SupportedHomeAutomationDevice[];
}
