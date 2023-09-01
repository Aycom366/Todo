import LeftArrow from "assets/images/leftArrow.png";
import RightArrow from "assets/images/rightArrow.png";
import { classNames } from "~/utils/functions";
import { PaginationProps, usePagination } from "~/utils/hooks/usePagination";

type IProps = PaginationProps & {
  onPageChange: (page: number) => void;
};

type PaginationRangeProps = (string | number)[];

export const Pagination = ({
  onPageChange,
  currentPage,
  pageSize,
  totalCount,
  siblingCount = 1,
}: IProps) => {
  const paginationRange = usePagination({
    currentPage,
    totalCount,
    siblingCount,
    pageSize,
  }) as PaginationRangeProps;

  const onNext = () => {
    onPageChange(currentPage + 1);
  };

  const onPrevious = () => {
    onPageChange(currentPage - 1);
  };

  const lastPage = paginationRange![paginationRange!.length - 1];

  return (
    <div className='flex-row-between  font-workSans text-sm'>
      <button
        disabled={currentPage === 1}
        onClick={onPrevious}
        className='leading-[20px] items-center flex gap-2 text-[#475467]'
      >
        <img src={LeftArrow} alt='Arrow Icon' />
        <span className='hidden sm:flex'>Previous</span>
      </button>
      <ul className='gap-[2px] justify-center flex items-center'>
        {paginationRange.map((pageNumber) => {
          if (pageNumber === "...") {
            return (
              <li
                className='w-10 h-10 rounded-full font-semibold text-[14px] leading-[20px] grid place-items-center text-[#475467]'
                key={Math.random()}
              >
                &#8230;
              </li>
            );
          }

          return (
            <li key={Math.random()}>
              <button
                className={classNames(
                  " w-10 h-10 rounded-full font-semibold text-[14px] leading-[20px] grid place-items-center text-[#475467]",
                  currentPage === pageNumber && "bg-[#F9FAFB]"
                )}
                onClick={() => onPageChange(+pageNumber)}
              >
                {pageNumber}
              </button>
            </li>
          );
        })}
      </ul>
      <button
        disabled={currentPage === lastPage}
        onClick={onNext}
        className='leading-[20px] items-center flex gap-2 text-[#475467],'
      >
        <span className='hidden sm:flex'>Next</span>
        <img src={RightArrow} alt='Arrow Icon' />
      </button>
    </div>
  );
};
