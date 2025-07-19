import { Separator } from "@/shared/ui/shadcn/separator";
import SelectField from "@/shared/ui/select/SelectField";
import { Button } from "@/shared/ui/shadcn/button";
import { filterStore } from "../model/filterStore";
import { observer } from "mobx-react-lite";

// import { Input } from "@/shared/ui/shadcn/input";

// const categories = [
//   "All",
//   "Bug",
//   "Feature",
//   "Documentation",
//   "Refactor",
//   "Test",
// ];
const statuses = ["All", "To Do", "In Progress", "Done"];
const priorities = ["All", "Low", "Medium", "High"];

const Filters = () => {
  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-1 gap-4 p-4">
        {/* <Input
          type="text"
          placeholder="Search tasks"
          className="w-full"
          value={filterStore.search}
          onChange={(e) => filterStore.setSearch(e.target.value)}
        />
        <SelectField
          label="Category"
          value={filterStore.category}
          onValueChange={(value) => filterStore.setCategory(value)}
          options={categories}
        /> */}
        <SelectField
          label="Status"
          value={filterStore.status}
          onValueChange={(value) => filterStore.setStatus(value)}
          options={statuses}
        />
        <SelectField
          label="Priority"
          value={filterStore.priority}
          onValueChange={(value) => filterStore.setPriority(value)}
          options={priorities}
        />
      </div>
      <Separator />
      <div className="p-1">
        <Button
          variant="ghost"
          className="w-full"
          onClick={() => filterStore.clearFilters()}
        >
          Clear filters
        </Button>
      </div>
    </>
  );
};

export default observer(Filters);
