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

function building() {
  return (
    <div>
      <Card>
        <CardBody>
          <Tabs isFitted size={"lg"} variant="enclosed" class=" p-3  ">
            <TabList>
              <Tab>Enviroment Management System</Tab>
              <Tab>Building Management System</Tab>
            </TabList>
            <TabPanels>
              <TabPanel>
                <h1>EMS</h1>
              </TabPanel>
              <TabPanel>
                <h1>BAS</h1>
              </TabPanel>
            </TabPanels>
          </Tabs>
        </CardBody>
      </Card>
    </div>
  );
}

export default building;
