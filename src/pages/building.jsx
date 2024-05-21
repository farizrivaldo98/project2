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
import BuildingRnD from "./buildingRnD";
import BuildingWH1 from "./buildingWH1";

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
              <Tab>Warehouse 1 Montoring</Tab>
            </TabList>
            <TabPanels>
              <TabPanel>
                <BuildingEMS />
              </TabPanel>
              <TabPanel>
                <BuildingBAS />
              </TabPanel>
              <TabPanel>
                <BuildingRnD />
              </TabPanel>
              <TabPanel>
                <BuildingWH1 />
              </TabPanel>
            </TabPanels>
          </Tabs>
        </CardBody>
      </Card>
    </div>
  );
}

export default Building;
