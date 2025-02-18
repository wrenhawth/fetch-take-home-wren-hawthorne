import { useCallback } from "react";
import { Dog } from "../lib/types";
import clsx from "clsx";

type DogCardProps = {
  dog: Dog;
  selected: boolean;
  onToggle: (dogId: string) => void;
};
export const DogCard = ({ dog, selected, onToggle }: DogCardProps) => {
  const toggleDog = useCallback(() => {
    onToggle(dog.id);
  }, [dog, onToggle]);

  return (
    <div
      className="card card-compact card-bordered bg-accent text-accent-content"
      key={dog.id}
    >
      <figure className="p-2">
        <img
          className="object-cover h-32 aspect-auto m-auto"
          src={dog.img}
          alt={dog.name}
        />
      </figure>
      <button
        className={clsx("btn btn-sm w-1/2 m-auto", selected ? "btn-outline" :"btn-primary")}
        onClick={toggleDog}
      >
        {selected ? "- Remove" : "+ Add"}
      </button>
      <div className="grid grid-cols-2 gap-0 items-center card-body [&&]:p-2">
        <h2 className="card-title">{dog.name}</h2>
        <p className="font-bold">{dog.breed}</p>
        <p className="font-semibold">Age: {dog.age}</p>
        <p>{dog.zip_code}</p>
      </div>
    </div>
  );
};
