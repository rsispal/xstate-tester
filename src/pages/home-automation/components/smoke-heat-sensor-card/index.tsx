import { ChangeEvent, FC, useCallback } from "react";
import { Box, Divider, Flex, Heading, Switch, Text } from "@chakra-ui/react";
import { SmokeHeatSensorDevice } from "../../types";

interface SmokeHeatSensorCardProps extends Omit<SmokeHeatSensorDevice, "type"> {
  onRunSensorTestCallback: (status: boolean) => void;
  onHushAlarmActivationCallback: (status: boolean) => void;
}
export const SmokeHeatSensorCard: FC<SmokeHeatSensorCardProps> = ({
  name,
  room,
  status,
  onRunSensorTestCallback,
  onHushAlarmActivationCallback,
}) => {
  const handleAlarmHush = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => onRunSensorTestCallback(event.target.checked),
    [onRunSensorTestCallback]
  );

  const handleSensorTest = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => onHushAlarmActivationCallback(event.target.checked),
    [onHushAlarmActivationCallback]
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
  const renderAlarmStateLabel = () => (
    <span>
      <Text fontSize="md" display="inline">
        Status:{" "}
      </Text>
      <Text fontWeight={700} fontSize="md" display="inline">
        {status.smokeLevel === "ALARM" || status.heatLevel === "ALARM" ? "IN ALARM" : "Normal"}
      </Text>
    </span>
  );
  const renderSmokeHeatStatusLabel = () => (
    <span>
      <Text fontSize="md" display="inline">
        Smoke:{" "}
      </Text>
      <Text fontWeight={700} fontSize="md" display="inline">
        {status.smokeLevel}{" "}
      </Text>
      <Text fontSize="md" display="inline">
        Heat:{" "}
      </Text>
      <Text fontWeight={700} fontSize="md" display="inline">
        {status.heatLevel}
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
      {renderAlarmStateLabel()}
      {renderSmokeHeatStatusLabel()}
    </Box>
  );
};
