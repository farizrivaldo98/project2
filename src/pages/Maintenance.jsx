import React from "react";
import {
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
} from "@chakra-ui/react";
import MachineBreakdown from "./MachineBreakdown";
import HandoverMaintenance from "./HandoverMaintenance";
import { useSelector } from "react-redux";
function Maintenance() {
  const userGlobal = useSelector((state) => state.user.user);
  return (
    <Card>
      <CardBody>
        <Tabs isFitted size={"lg"} variant="enclosed" class=" p-3  ">
          <TabList>
            {userGlobal.level <= 2 ? (
              <Tab className="font-bold">Maintenance Breakdown Pareto</Tab>
            ) : (
              <>
                <Tab className="font-bold">Maintenance Report</Tab>
                <Tab className="font-bold">Maintenance Breakdown Pareto</Tab>
                <Tab className="font-bold">Data Report</Tab>
              </>
            )}
          </TabList>

          <TabPanels>
            {userGlobal.level <= 2 ? (
              <TabPanel>
                <MachineBreakdown />
              </TabPanel>
            ) : (
              ((
                <TabPanel>
                  <HandoverMaintenance />
                </TabPanel>
              ),
              (
                <TabPanel>
                  <MachineBreakdown />
                </TabPanel>
              ),
              (
                <TabPanel>
                  <p>three!</p>
                </TabPanel>
              ))
            )}
          </TabPanels>
        </Tabs>
      </CardBody>
    </Card>
  );
}

export default Maintenance;
