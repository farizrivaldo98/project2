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
                <p>CHILLER</p>
              </TabPanel>
              <TabPanel>
                <p>AIR HANDLING</p>
              </TabPanel>
              <TabPanel>
                <p>HEATING</p>
              </TabPanel>
            </TabPanels>
          </Tabs>
        </CardBody>
      </Card>
    </div>
  );
}

export default HVAC;
