type BreedFilterProps = {
  breeds: string[];
  selectedBreed: string | null;
  onSelect: (breed: string | null) => void;
};
export const BreedFilter = ({
  breeds,
  selectedBreed,
  onSelect,
}: BreedFilterProps) => {
  return (
    <select
      className="select select-bordered w-full max-w-xs"
      onChange={(e) => {
        if (e.currentTarget.value !== "All Breeds") {
          onSelect(e.currentTarget.value);
        } else {
          onSelect(null);
        }
      }}
      value={selectedBreed ? selectedBreed : "All Breeds"}
    >
      <option>All Breeds</option>
      {breeds.map((breed) => (
        <option key={breed} value={breed} onClick={() => onSelect(breed)}>
          {breed}
        </option>
      ))}
    </select>
  );
};
