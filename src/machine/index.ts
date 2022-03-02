import { assign, createMachine } from "xstate";
import {
  HomeAutomationDeviceType,
  SmokeHeatSensorDevice,
  SupportedHomeAutomationDevice,
  TemperatureHumiditySensorDevice,
  ThermostatDevice,
} from "../pages/home-automation/types";
import { fetchHomeAutomationDevices, useHomeAutomationConnection } from "../queries/use-home-automation-connection";

interface HomeAutomationContext {
  devices: SupportedHomeAutomationDevice[];
}

export const homeAutomationMachine = createMachine<HomeAutomationContext>(
  {
    id: "homeAutomation",
    initial: "loading",
    context: {
      devices: [],
    },
    states: {
      loading: {
        invoke: {
          src: "fetchDevices",
          onDone: {
            target: "ready",
            actions: "setDevices",
          },
        },
      },
      ready: {
        on: {
          REFRESH: {
            target: "loading",
          },
          SIMULATE_EVENT: {
            actions: "simulateEvent",
            target: "ready",
          },
          CHANGE_LIGHT_STATE: {
            actions: "changeLightState",
            target: "ready",
          },
          CHANGE_SWITCH_STATE: {
            actions: "changeSwitchState",
            target: "ready",
          },
        },
      },
    },
  },
  {
    actions: {
      setDevices: assign({
        devices: (_ctx, payload) => {
          // WRAPS THE ACTUAL SERVICE RESPONSE IN "data" PROPERTY
          return payload.data;
        },
      }),
      simulateEvent: assign({
        devices: (_ctx, payload) => {
          console.log("Simulating event...", _ctx, payload);
          const { simulation } = payload;
          let mutated = _ctx.devices.map((d) => {
            if (d.id === simulation.id) {
              switch (simulation.type) {
                case HomeAutomationDeviceType.SMOKE_HEAT_SENSOR: {
                  return {
                    ...d,
                    status: simulation.status as SmokeHeatSensorDevice["status"],
                  } as SmokeHeatSensorDevice;
                }
                case HomeAutomationDeviceType.THERMOSTAT: {
                  const { ambientTemperature, targetTemperature } = simulation.status as ThermostatDevice["status"];
                  return {
                    ...d,
                    status: {
                      ambientTemperature,
                      targetTemperature,
                      isOn: parseFloat(ambientTemperature.toString()) > parseFloat(targetTemperature.toString()) ? true : false,
                    },
                  } as ThermostatDevice;
                }
                case HomeAutomationDeviceType.TEMPERATURE_HUMIDITY_SENSOR: {
                  return {
                    ...d,
                    status: simulation.status as TemperatureHumiditySensorDevice["status"],
                  } as TemperatureHumiditySensorDevice;
                }
                default: {
                  return d;
                }
              }
            }
            return d;
          });

          return mutated;
        },
      }),
      changeLightState: assign({
        devices: (_ctx, payload) => {
          console.log("Change Light State...", _ctx, payload);
          let mutated = _ctx.devices.map((d) => {
            if (d.id === payload.id) {
              return {
                ...d,
                status: payload.status,
              };
            }
            return d;
          });

          return mutated;
        },
      }),
      changeSwitchState: assign({
        devices: (_ctx, payload) => {
          console.log("Change Switch State...", _ctx, payload);
          let mutated = _ctx.devices.map((d) => {
            if (d.id === payload.id) {
              return {
                ...d,
                status: payload.status,
              };
            }
            return d;
          });

          return mutated;
        },
      }),
    },
    services: {
      fetchDevices: async () =>
        new Promise((resolve) => {
          const response = fetchHomeAutomationDevices();
          setTimeout(() => resolve(response), 1000 * Math.floor(Math.random() * 5) + 1);
        }),
    },
  }
);
