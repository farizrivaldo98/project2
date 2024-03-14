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
import BuildingBAS from "./buildingBAS";
import BuildingEMS from "./buildingEMS";

function Building() {
  return (
    <div>
      <Card>
        <CardBody>
          <Tabs isFitted size={"lg"} variant="enclosed" class=" p-3  ">
            <TabList>
              <Tab>Enviroment Monitoring Process</Tab>
              <Tab>Building Management System</Tab>
              <Tab>RnD Laboratorium Montoring</Tab>
            </TabList>
            <TabPanels>
              <TabPanel>
                <BuildingEMS />
              </TabPanel>
              <TabPanel>
                <BuildingBAS />
              </TabPanel>
              <TabPanel>
                RnD Laboratorium Monitoring
              </TabPanel>
            </TabPanels>
          </Tabs>
        </CardBody>
      </Card>
    </div>
  );
}

export default Building;
