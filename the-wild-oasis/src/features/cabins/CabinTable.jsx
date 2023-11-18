import useCabins from "./useCabins";
import Spinner from "../../ui/Spinner";
import CabinRow from "./CabinRow";
import { toast } from "sonner";
import Table from "../../ui/Table";
import Menus from "../../ui/Menus";
import useUrlParams from "../../hooks/useUrlParams";

function CabinTable() {
  const [cabinFilter] = useUrlParams("discount");
  const [cabinSort] = useUrlParams("sortBy");

  const { isLoading, error, cabins } = useCabins();

  if (isLoading) return <Spinner></Spinner>;
  if (error) {
    return toast.error(error.message);
  }

  let filteredCabins = cabins;
  if (cabinFilter === "no-discount")
    filteredCabins = cabins.filter((cabin) => cabin.discount <= 0);

  if (cabinFilter === "with-discount")
    filteredCabins = cabins.filter((cabin) => cabin.discount > 0);

  let sortedCabins = filteredCabins.slice().sort((a, b) => a.name - b.name);
  if (cabinSort === "name-desc")
    sortedCabins = filteredCabins.slice().sort((a, b) => b.name - a.name);

  if (cabinSort === "regularPrice-desc")
    sortedCabins = filteredCabins.slice().sort((a, b) => a.price - b.price);

  if (cabinSort === "regularPrice-asc")
    sortedCabins = filteredCabins.slice().sort((a, b) => b.price - a.price);

  if (cabinSort === "maxCapacity-asc")
    sortedCabins = filteredCabins
      .slice()
      .sort((a, b) => a.maxGuests - b.maxGuests);

  if (cabinSort === "maxCapacity-desc")
    sortedCabins = filteredCabins
      .slice()
      .sort((a, b) => b.maxGuests - a.maxGuests);

  return (
    <Table columns="0.6fr 1.8fr 2.2fr 1fr 1fr 1fr">
      <Table.Header headings={["", "Cabin", "Capacity", "Price", "Discount"]} />
      <Menus>
        <Table.Body
          data={sortedCabins}
          render={(cabin) => <CabinRow key={cabin.id} cabin={cabin} />}
        />
      </Menus>
    </Table>
  );
}

export default CabinTable;
