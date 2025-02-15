export type PaginationInfo = {
  total: number;
  next?: string;
  prev?: string;
};

type PaginationProps = {
  paginationInfo: PaginationInfo;
  setSearchString: React.Dispatch<React.SetStateAction<string>>;
};

export const Pagination = ({
  paginationInfo,
  setSearchString,
}: PaginationProps) => {
  return (
    <div className="w-1/4 join grid grid-cols-2 p-4 m-auto">
      <button
        className="join-item btn btn-outline"
        onClick={() => {
          if (paginationInfo?.prev) {
            setSearchString(paginationInfo?.prev);
            window.scrollTo({ behavior: "smooth", top: 0 });
          }
        }}
        disabled={!paginationInfo?.prev}
      >
        Prev
      </button>
      <button
        className="join-item btn btn-outline"
        onClick={() => {
          if (paginationInfo?.next) {
            setSearchString(paginationInfo?.next);
            window.scrollTo({ behavior: "smooth", top: 0 });
          }
        }}
        disabled={!paginationInfo?.next}
      >
        Next
      </button>
    </div>
  );
};
