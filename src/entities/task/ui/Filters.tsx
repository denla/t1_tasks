import { Separator } from "@/shared/ui/shadcn/separator";
import SelectField from "@/shared/ui/select/SelectField";
import { Button } from "@/shared/ui/shadcn/button";

const categories = [
  "All",
  "Bug",
  "Feature",
  "Documentation",
  "Refactor",
  "Test",
];
const statuses = ["All", "To Do", "In Progress", "Done"];
const priorities = ["All", "Low", "Medium", "High"];

type FiltersProps = {
  category: string;
  setCategory: (value: string) => void;
  status: string;
  setStatus: (value: string) => void;
  priority: string;
  setPriority: (value: string) => void;
  clearFilters: () => void;
};

const Filters = ({
  category,
  setCategory,
  status,
  setStatus,
  priority,
  setPriority,
  clearFilters,
}: FiltersProps) => {
  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-1 gap-4 p-4">
        <SelectField
          label="Category"
          value={category}
          onValueChange={setCategory}
          options={categories}
        />
        <SelectField
          label="Status"
          value={status}
          onValueChange={setStatus}
          options={statuses}
        />

        <SelectField
          label="Priority"
          value={priority}
          onValueChange={setPriority}
          options={priorities}
        />
      </div>
      <Separator />
      <div className="p-1">
        <Button
          variant="ghost"
          className="w-full"
          onClick={() => clearFilters()}
        >
          Clear filters
        </Button>
      </div>
    </>
  );
};

export default Filters;
