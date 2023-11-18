import Heading from "../../ui/Heading";
import Row from "../../ui/Row";
import CabinTable from "../../features/cabins/CabinTable";
import AddCabin from "../../features/cabins/AddCabin";

import CabinTableOperations from "../../features/cabins/cabinTableOperations";
import { styled } from "styled-components";

const AlignStart = styled.div`
  align-self: start;
`;

function Cabins() {
  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">All cabins</Heading>

        <CabinTableOperations />
      </Row>

      <Row>
        <CabinTable />
        <AlignStart>
          <AddCabin />
        </AlignStart>
      </Row>
    </>
  );
}

export default Cabins;

// useSearchParam is a context that can be used everywhere within our app.
// const [greeting, setGreeting] = useSearchParamsState("greeting", "hello");
