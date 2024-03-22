type IOptions = {
  limit?: number;
  page?: number;
  sortBy?: string;
  sortOrder?: string;
};

type IOptionResult = {
  limit?: number;
  page?: number;
  skip: number;
  sortBy?: string;
  sortOrder?: string;
};

const calculatePagination = (options: IOptions): IOptionResult => {
  const page: number = Number(options.page) || 1;
  const limit: number = Number(options.limit) || 10;
  const sortBy: string = options.sortBy || "createdAt";
  const sortOrder: string = options.sortOrder || "desc";
  const skip = Number(page - 1) * limit;

  return {
    page,
    limit,
    sortBy,
    sortOrder,
    skip,
  };
};
export const paginationHelper = {
  calculatePagination,
};
