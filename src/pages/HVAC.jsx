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
import HVACchiller from "./HVACchiller";
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
                <HVACchiller />
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
