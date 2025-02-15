import { Dog } from "../lib/types";

export const DogCard = (props: { dog: Dog }) => {
  const { dog } = props;
  return (
    <div
      className="card card-compact card-bordered bg-accent text-accent-content"
      key={dog.id}
    >
      <figure className="p-4">
        <img
          className="object-cover h-32 aspect-auto m-auto"
          src={dog.img}
          alt={dog.name}
        />
      </figure>
      <div className="grid grid-cols-2 gap-0 items-center card-body">
        <h2 className="card-title">{dog.name}</h2>
        <p className="font-bold">{dog.breed}</p>
        <p className="font-semibold">Age: {dog.age}</p>
        <p>{dog.zip_code}</p>
      </div>
    </div>
  );
};
