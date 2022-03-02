import { ChangeEvent, FC, useCallback } from "react";
import { Box, Divider, Flex, Heading, Switch, Text } from "@chakra-ui/react";

import { LightSwitchDevice } from "../../types/";

interface LightSwitchCardProps extends Omit<LightSwitchDevice, "type"> {
  onChangeCallback: (id: string, status: boolean) => void;
}
export const LightSwitchCard: FC<LightSwitchCardProps> = ({ id, name, room, status, onChangeCallback }) => {
  const handleChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => onChangeCallback(id, event.target.checked),
    [onChangeCallback]
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
  const renderStatusLabel = () => (
    <span>
      <Text fontSize="md" display="inline">
        Light is currently{" "}
      </Text>
      <Text fontWeight={700} fontSize="md" display="inline">
        {status ? "on" : "off"}
      </Text>
    </span>
  );
  const renderSwitchControl = () => <Switch colorScheme="teal" size="lg" isChecked={status} onChange={handleChange} />;
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
      {renderStatusLabel()}
      <Divider />
      {renderSwitchControl()}
    </Box>
  );
};
