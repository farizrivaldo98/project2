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
import HVAC_chiller from "./HVAC_chiller";
import HVAC_handeling from "./HVAC_handeling";
import HVAC_heating from "./HVAC_heating";
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
                <HVAC_chiller />
              </TabPanel>
              <TabPanel>
                <HVAC_handeling />
              </TabPanel>
              <TabPanel>
                <HVAC_heating />
              </TabPanel>
            </TabPanels>
          </Tabs>
        </CardBody>
      </Card>
    </div>
  );
}

export default HVAC;
