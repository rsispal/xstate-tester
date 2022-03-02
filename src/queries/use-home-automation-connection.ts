import { useQuery } from "react-query";
import { SupportedHomeAutomationDevice } from "../pages/home-automation/types";
import { SAMPLE_DATA } from "../seed-data";

export const fetchHomeAutomationDevices = (): SupportedHomeAutomationDevice[] => {
  return SAMPLE_DATA;
};

export const useHomeAutomationConnection = () => {
  return useQuery(
    "devices",
    () => {
      return new Promise<SupportedHomeAutomationDevice[]>((resolve) => {
        const response = fetchHomeAutomationDevices();
        // Simulate a slow'ish API call
        setTimeout(() => {
          resolve(response);
        }, 3000);
      });
    },
    {
      refetchInterval: 10000,
    }
  );
};
