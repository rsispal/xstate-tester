import { ChangeEvent, FC, useCallback } from "react";
import { Box, Divider, Flex, Heading, Switch, Text } from "@chakra-ui/react";
import { TemperatureHumiditySensorDevice } from "../../types";

interface TemperatureHumiditySensorCardProps extends Omit<TemperatureHumiditySensorDevice, "type"> {
  onEnableDisableChange: (status: boolean) => void;
}
export const TemperatureHumiditySensorCard: FC<TemperatureHumiditySensorCardProps> = ({
  name,
  room,
  status,
  onEnableDisableChange,
}) => {
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
        Temperature:{" "}
      </Text>
      <Text fontWeight={700} fontSize="md" display="inline">
        {`${status.temperature}°C`}
      </Text>
    </span>
  );
  const renderHumidityLabel = () => (
    <span>
      <Text fontSize="md" display="inline">
        Humidity:{" "}
      </Text>
      <Text fontWeight={700} fontSize="md" display="inline">
        {`${status.humidity} %`}
      </Text>
    </span>
  );
  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="space-evenly"
      w="200px"
      h="200px"
      color="gray"
      border="1px solid #d8d8d8"
      padding="4px">
      {renderDeviceNameLabel()}
      {renderDeviceRoomLabel()}
      <Divider />
      {renderTemperatureLabel()}
      {renderHumidityLabel()}
    </Box>
  );
};
