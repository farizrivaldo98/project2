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

function Utility() {
  return (
    <div>
      <Card>
        <CardBody>
          <Tabs isFitted size={"lg"} variant="enclosed" class=" p-3  ">
            <TabList>
              <Tab>Power Management</Tab>
              <Tab>Water Management</Tab>
              <Tab>Waste Water Management</Tab>
              <Tab>Heating Ventilating & Air Control</Tab>
              <Tab>Steam Control</Tab>
              <Tab>Purified Control</Tab>
              <Tab>Solar Management</Tab>
            </TabList>

            <TabPanels>
              <TabPanel>
                <div>Power Management</div>
              </TabPanel>
              <TabPanel>
                <div>Water Management</div>
              </TabPanel>
              <TabPanel>
                <p>Waste Water Management</p>
              </TabPanel>
              <TabPanel>
                <p>Heating Ventilating & Air Control</p>
              </TabPanel>
              <TabPanel>
                <p>Steam Control</p>
              </TabPanel>
              <TabPanel>
                <p>Purified Control</p>
              </TabPanel>
              <TabPanel>
                <p>Solar Management</p>
              </TabPanel>
            </TabPanels>
          </Tabs>
        </CardBody>
      </Card>
    </div>
  );
}

export default Utility;
