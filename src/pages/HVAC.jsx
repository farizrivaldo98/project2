import React from "react";
import {
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Card,
  CardBody,
} from "@chakra-ui/react";
import HVACchillerChart from "./HVACchillerChart";
import HVAChandeling from "./HVAChandeling";
import HVACheating from "./HVACheating";
function HVAC() {
  return (
    <div>
      <Card>
        <CardBody>
          <Tabs isFitted size={"lg"} variant="enclosed" class=" p-3  ">
            <TabList>
              <Tab>CHILLER</Tab>
              <Tab>AIR HANDLING</Tab>
              <Tab>HEATING</Tab>
            </TabList>
            <TabPanels>
              <TabPanel>
                <HVACchillerChart />
              </TabPanel>
              <TabPanel>
                <HVAChandeling />
              </TabPanel>
              <TabPanel>
                <HVACheating />
              </TabPanel>
            </TabPanels>
          </Tabs>
        </CardBody>
      </Card>
    </div>
  );
}

export default HVAC;
