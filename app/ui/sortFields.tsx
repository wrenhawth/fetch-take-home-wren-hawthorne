import clsx from "clsx";
import _ from "lodash";

export type SortFieldValue = "breed" | "name" | "age";

export type SortInfo = {
  term: "name" | "breed" | "age";
  direction: "asc" | "desc";
};

type SortFieldProps = {
  sortInfo: SortInfo;
  setSortInfo: (info: SortInfo) => void;
};

const SORT_FIELDS: SortFieldValue[] = ["breed", "name", "age"];

export const SortFields = ({ sortInfo, setSortInfo }: SortFieldProps) => {
  const updateSortInfo = (f: SortFieldValue) => {
    if (sortInfo.term === f) {
      setSortInfo({
        ...sortInfo,
        direction: sortInfo.direction === "asc" ? "desc" : "asc",
      });
    } else {
      setSortInfo({
        term: f,
        direction: "asc",
      });
    }
  };

  return (
    <div className="flex">
      {SORT_FIELDS.map((f) => {
        const selected = sortInfo.term === f;
        return (
          <div
            key={f}
            className={clsx(
              "badge badge-md m-1",
              selected ? "badge-primary" : "badge-ghost",
              selected ? "font-semibold" : undefined
            )}
            onClick={() => updateSortInfo(f)}
          >
            {selected && sortInfo.direction === "asc" && "⬆️"}
            {selected && sortInfo.direction === "desc" && "⬇️"}
            {_.capitalize(f)}
          </div>
        );
      })}
    </div>
  );
};
