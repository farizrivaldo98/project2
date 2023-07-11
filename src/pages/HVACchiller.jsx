import React from "react";
import { Button } from "@chakra-ui/react";
function HVACchiller() {
  return (
    <div>
      <div>
        <br />
        <Button className="ml-4" colorScheme="gray">
          Show All Data
        </Button>
        <Button className="ml-4" colorScheme="gray">
          Hiden All Data
        </Button>
      </div>
    </div>
  );
}

export default HVACchiller;
