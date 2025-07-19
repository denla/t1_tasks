import { Card } from "@/shared/ui/shadcn/card";
import { Checkbox } from "@/shared/ui/shadcn/checkbox";
import { Label } from "@/shared/ui/shadcn/label";
import { ScrollArea } from "@/shared/ui/shadcn/scroll-area";

const categories = ["Bug", "Feature", "Refactor", "Docs"];
const priorities = ["Low", "Medium", "High"];

const SidebarFilters = () => {
  return (
    <Card className="w-64 p-4 space-y-6">
      <ScrollArea className="h-full">
        <div>
          <h3 className="font-semibold text-sm mb-2">Category</h3>
          {categories.map((cat) => (
            <div key={cat} className="flex items-center space-x-2 mb-1">
              <Checkbox id={`cat-${cat}`} />
              <Label htmlFor={`cat-${cat}`}>{cat}</Label>
            </div>
          ))}
        </div>

        <div>
          <h3 className="font-semibold text-sm mb-2 mt-4">Priority</h3>
          {priorities.map((pri) => (
            <div key={pri} className="flex items-center space-x-2 mb-1">
              <Checkbox id={`pri-${pri}`} />
              <Label htmlFor={`pri-${pri}`}>{pri}</Label>
            </div>
          ))}
        </div>
      </ScrollArea>
    </Card>
  );
};

export default SidebarFilters;
