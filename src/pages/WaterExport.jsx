import React, { useEffect, Component, useState } from "react";
import {
    Tabs,
    TabList,
    TabPanels,
    Tab,
    TabPanel,
    Card,
    CardBody,
  } from "@chakra-ui/react";
  import WaterExportDaily from "./WaterExportDaily";
  import WaterExportMonthly from "./WaterExportMonthly";
  import WaterExportYearly from "./WaterExportYearly";

function WaterExport() {
    return (
        <div>
          <Card>
            <CardBody>
              <Tabs isFitted size={"lg"} variant="enclosed" class=" p-3  ">
                <TabList>
                  <Tab>Daily</Tab>
                  <Tab>Monthly</Tab>
                  <Tab>Yearly</Tab>
                </TabList>
                <TabPanels>
                  <TabPanel>
                    <WaterExportDaily />
                  </TabPanel>
                  <TabPanel>
                    <WaterExportMonthly />
                  </TabPanel>
                  <TabPanel>
                    <WaterExportYearly />
                  </TabPanel>
                </TabPanels>
              </Tabs>
            </CardBody>
          </Card>
        </div>
      );
    
}
export default WaterExport;