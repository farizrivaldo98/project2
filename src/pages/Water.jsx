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
import WaterManagement from "./WaterManagement";
import WaterExport from "./WaterExport";

function Water() {
  return (
    <div>
      <Card>
        <CardBody>
          <Tabs isFitted size={"lg"} variant="enclosed" class=" p-3  ">
            <TabList>
              <Tab>Water Consumption Graph</Tab>
              <Tab>Export Water Data</Tab>
            </TabList>
            <TabPanels>
              <TabPanel>
                <WaterManagement />
              </TabPanel>
              <TabPanel>
                <WaterExport />
              </TabPanel>
            </TabPanels>
          </Tabs>
        </CardBody>
      </Card>
    </div>
  );
}

export default Water;