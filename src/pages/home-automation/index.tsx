import { FC } from "react";
import { Box, Button, Divider, Heading, Spinner, StackDivider, VStack, Wrap, WrapItem } from "@chakra-ui/react";
import { useMachine } from "@xstate/react";

/* Components */
import { LightSwitchCard } from "./components/light-switch-card";
import { MainsSwitchCard } from "./components/mains-switch-card";
import { TemperatureHumiditySensorCard } from "./components/temperature-humidity-sensor-card";
import { SmokeHeatSensorCard } from "./components/smoke-heat-sensor-card";

/* Machines */
import { homeAutomationMachine } from "../../machine";

/* Hooks / Queries */
import { useHomeAutomationConnection } from "../../queries/use-home-automation-connection";

/* Types */
import { HomeAutomationState, HomeAutomationDeviceType, SupportedHomeAutomationDevice } from "./types";
import { ThermostatCard } from "./components/thermostat-card";

const getListOfRoomFromDevices = (devices: SupportedHomeAutomationDevice[]) =>
  devices.map(({ room }) => room).filter((value, index, self) => self.indexOf(value) === index);

const getDevicesByRoom = (room: string, devices: SupportedHomeAutomationDevice[]) => devices.filter((d) => d.room === room);

interface MyHomeProps {}

export const MyHome: FC<MyHomeProps> = () => {
  // const { data, isLoading } = useHomeAutomationConnection();

  const [state, send] = useMachine(homeAutomationMachine);

  const renderHeader = () => (
    <Box flexDirection="row" w="100vw" minH="100px">
      <Heading as="h1">Home Control</Heading>
    </Box>
  );

  const renderSimulationControls = () => (
    <Box flexDirection="row" w="100vw" h="200px">
      <Heading size="md">CURRENT STATE: {state.value}</Heading>
      <Divider />
      <Heading size="md">Simulation</Heading>
      <Button onClick={() => send("REFRESH")}>Refresh Devices</Button>
      <Button
        onClick={() =>
          send("SIMULATE_EVENT", {
            simulation: {
              id: "2de57728-c4af-4d7a-b471-dc0f3d1f18e7",
              type: HomeAutomationDeviceType.THERMOSTAT,
              status: {
                targetTemperature: (Math.random() * 32 + 16).toFixed(1),
                ambientTemperature: (Math.random() * 28 + 0).toFixed(1),
              },
            },
          })
        }>
        Turn On Thermostat - Hallway
      </Button>
      <Button
        onClick={() =>
          send("SIMULATE_EVENT", {
            simulation: {
              id: "1d7feb6a-4f90-4cad-ab51-6517ce2f61e8",
              type: HomeAutomationDeviceType.TEMPERATURE_HUMIDITY_SENSOR,
              status: { temperature: (Math.random() * 40 + 1).toFixed(1), humidity: (Math.random() * 89 + 10).toFixed(1) },
            },
          })
        }>
        Randomise Temp/Hum - Kitchen
      </Button>
      <Button
        onClick={() =>
          send("SIMULATE_EVENT", {
            simulation: {
              id: "bdd1c661-1887-4156-a62a-9ec34fd5bbd4",
              type: HomeAutomationDeviceType.TEMPERATURE_HUMIDITY_SENSOR,
              status: { temperature: (Math.random() * 40 + 1).toFixed(1), humidity: (Math.random() * 89 + 10).toFixed(1) },
            },
          })
        }>
        Randomise Temp/Hum - Living Room
      </Button>
      <Button
        onClick={() =>
          send("SIMULATE_EVENT", {
            simulation: {
              id: "aa1053ea-9592-46f6-a751-6d1887067d67",
              type: HomeAutomationDeviceType.TEMPERATURE_HUMIDITY_SENSOR,
              status: { temperature: (Math.random() * 40 + 1).toFixed(1), humidity: (Math.random() * 89 + 10).toFixed(1) },
            },
          })
        }>
        Randomise Temp/Hum - Bedroom
      </Button>
      <Button
        onClick={() =>
          send("SIMULATE_EVENT", {
            simulation: {
              id: "b01579eb-48c2-41d4-8205-091d9e9d5c98",
              type: HomeAutomationDeviceType.SMOKE_HEAT_SENSOR,
              status: { smokeLevel: "ALARM", heatLevel: "ALARM" },
            },
          })
        }>
        Simulate Fire - Kitchen
      </Button>
      <Button
        onClick={() =>
          send("SIMULATE_EVENT", {
            simulation: {
              id: "89b2e381-3f46-4789-975e-783d0c406535",
              type: HomeAutomationDeviceType.SMOKE_HEAT_SENSOR,
              status: { smokeLevel: "ALARM", heatLevel: "ALARM" },
            },
          })
        }>
        Simulate Fire - Living Room
      </Button>
      <Button
        onClick={() =>
          send("SIMULATE_EVENT", {
            simulation: {
              id: "95cd2fa6-d85a-4449-8a65-c7d7d3ff0c39",
              type: HomeAutomationDeviceType.SMOKE_HEAT_SENSOR,
              status: { smokeLevel: "ALARM", heatLevel: "ALARM" },
            },
          })
        }>
        Simulate Fire - Bedroom
      </Button>
      <Button
        onClick={() =>
          send("SIMULATE_EVENT", {
            simulation: {
              id: "b01579eb-48c2-41d4-8205-091d9e9d5c98",
              type: HomeAutomationDeviceType.SMOKE_HEAT_SENSOR,
              status: { smokeLevel: "NORMAL", heatLevel: "NORMAL" },
            },
          })
        }>
        Clear Fire Event - Kitchen
      </Button>
      <Button
        onClick={() =>
          send("SIMULATE_EVENT", {
            simulation: {
              id: "89b2e381-3f46-4789-975e-783d0c406535",
              type: HomeAutomationDeviceType.SMOKE_HEAT_SENSOR,
              status: { smokeLevel: "NORMAL", heatLevel: "NORMAL" },
            },
          })
        }>
        Clear Fire Event - Living Room
      </Button>
      <Button
        onClick={() =>
          send("SIMULATE_EVENT", {
            simulation: {
              id: "95cd2fa6-d85a-4449-8a65-c7d7d3ff0c39",
              type: HomeAutomationDeviceType.SMOKE_HEAT_SENSOR,
              status: { smokeLevel: "NORMAL", heatLevel: "NORMAL" },
            },
          })
        }>
        Clear Fire Event - Bedroom
      </Button>
      <Button
        onClick={() =>
          send("SIMULATE_EVENT", {
            simulation: {
              id: "b01579eb-48c2-41d4-8205-091d9e9d5c98",
              type: HomeAutomationDeviceType.SMOKE_HEAT_SENSOR,
              status: { smokeLevel: "FAULT", heatLevel: "FAULT" },
            },
          })
        }>
        Simulate Fault Event - Kitchen
      </Button>
      <Button
        onClick={() =>
          send("SIMULATE_EVENT", {
            simulation: {
              id: "89b2e381-3f46-4789-975e-783d0c406535",
              type: HomeAutomationDeviceType.SMOKE_HEAT_SENSOR,
              status: { smokeLevel: "FAULT", heatLevel: "FAULT" },
            },
          })
        }>
        Simulate Fault Event - Living Room
      </Button>
      <Button
        onClick={() =>
          send("SIMULATE_EVENT", {
            simulation: {
              id: "95cd2fa6-d85a-4449-8a65-c7d7d3ff0c39",
              type: HomeAutomationDeviceType.SMOKE_HEAT_SENSOR,
              status: { smokeLevel: "FAULT", heatLevel: "FAULT" },
            },
          })
        }>
        Simulate Fault Event - Bedroom
      </Button>
      {/* <pre>{JSON.stringify(state.context, null, 2)}</pre> */}
    </Box>
  );

  const renderSingleDevice = (device: SupportedHomeAutomationDevice) => {
    switch (device.type) {
      case HomeAutomationDeviceType.MAINS_SWITCH: {
        return (
          <MainsSwitchCard
            id={device.id}
            name={device.name}
            room={device.room}
            status={device.status}
            lastUpdate={device.lastUpdate}
            onChangeCallback={(id, status) => send("CHANGE_SWITCH_STATE", { id, status })}
          />
        );
      }
      case HomeAutomationDeviceType.LIGHT_SWITCH: {
        return (
          <LightSwitchCard
            id={device.id}
            name={device.name}
            room={device.room}
            status={device.status}
            lastUpdate={device.lastUpdate}
            onChangeCallback={(id, status) => send("CHANGE_LIGHT_STATE", { id, status })}
          />
        );
      }
      case HomeAutomationDeviceType.TEMPERATURE_HUMIDITY_SENSOR: {
        return (
          <TemperatureHumiditySensorCard
            id={device.id}
            name={device.name}
            room={device.room}
            status={device.status}
            lastUpdate={device.lastUpdate}
            onEnableDisableChange={(status) => console.log("Switch state", { status })}
          />
        );
        break;
      }
      case HomeAutomationDeviceType.THERMOSTAT: {
        return (
          <ThermostatCard
            id={device.id}
            name={device.name}
            room={device.room}
            status={device.status}
            lastUpdate={device.lastUpdate}
            onEnableDisableChange={(status) => console.log("Switch state", { status })}
          />
        );
        break;
      }
      case HomeAutomationDeviceType.SMOKE_HEAT_SENSOR: {
        return (
          <SmokeHeatSensorCard
            id={device.id}
            name={device.name}
            room={device.room}
            status={device.status}
            lastUpdate={device.lastUpdate}
            onRunSensorTestCallback={(status) => console.log("Run sensor test", { status })}
            onHushAlarmActivationCallback={(status) => console.log("Hush alarm sounder", { status })}
          />
        );
        break;
      }
    }
    return <p>UNSUPPORTED</p>;
  };

  const renderSectionForRoom = (room: string, devices: SupportedHomeAutomationDevice[]) => {
    return (
      <Box key={room} width="100%">
        <Heading as="h2" size="lg">
          {room}
        </Heading>
        <Wrap>
          {getDevicesByRoom(room, devices).map((device) => (
            <WrapItem key={device.id}>{renderSingleDevice(device)}</WrapItem>
          ))}
        </Wrap>
      </Box>
    );
  };

  const renderDevicesDashboard = () => {
    if (state.matches("loading")) {
      return (
        <Box flex={1} flexDirection="row" w="100vw">
          <Spinner />
        </Box>
      );
    }
    return (
      <Box flex={1} flexDirection="row" w="100vw">
        <VStack divider={<StackDivider borderColor="gray.200" />} spacing={4} align="stretch">
          {state.context.devices &&
            getListOfRoomFromDevices(state.context.devices).map((room) => renderSectionForRoom(room, state.context.devices))}
        </VStack>
      </Box>
    );
  };

  return (
    <Box padding={"12px"}>
      {renderHeader()}
      <Divider />

      {renderSimulationControls()}
      <Divider />

      {renderDevicesDashboard()}
    </Box>
  );
};
