import { ChangeEvent, FC, useCallback } from "react";
import { Box, Divider, Flex, Heading, Switch, Text } from "@chakra-ui/react";
import { ThermostatDevice } from "../../types";

interface ThermostatCardProps extends Omit<ThermostatDevice, "type"> {
  onEnableDisableChange: (status: boolean) => void;
}
export const ThermostatCard: FC<ThermostatCardProps> = ({ name, room, status, onEnableDisableChange }) => {
  const handleChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => onEnableDisableChange(event.target.checked),
    [onEnableDisableChange]
  );

  const renderDeviceNameLabel = () => (
    <Heading as="h3" size="lg">
      {name ?? "Unknown light"}
    </Heading>
  );

  const renderDeviceRoomLabel = () => (
    <Text fontSize="md" fontWeight={700}>
      {room ?? "No room"}
    </Text>
  );
  const renderTemperatureLabel = () => (
    <span>
      <Text fontSize="md" display="inline">
        Ambient Temperature:{" "}
      </Text>
      <Text fontWeight={700} fontSize="md" display="inline">
        {`${status.ambientTemperature}°C`}
      </Text>
    </span>
  );
  const renderHumidityLabel = () => (
    <span>
      <Text fontSize="md" display="inline">
        {status.isOn ? `Target: ` : " "}
      </Text>
      <Text fontWeight={700} fontSize="md" display="inline">
        {status.isOn ? `${status.targetTemperature}°C` : "-"}
      </Text>
    </span>
  );
  const renderOnOffLabel = () => (
    <span>
      <Text fontSize="md" display="inline">
        Thermostat is{" "}
      </Text>
      <Text fontWeight={700} fontSize="md" display="inline">
        {status.isOn ? `on` : "off"}
      </Text>
    </span>
  );
  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="space-evenly"
      w="320px"
      h="200px"
      color="gray"
      border="1px solid #d8d8d8"
      padding="4px">
      {renderDeviceNameLabel()}
      {renderDeviceRoomLabel()}
      <Divider />
      {renderOnOffLabel()}
      <Divider />
      {renderTemperatureLabel()}
      {renderHumidityLabel()}
    </Box>
  );
};
