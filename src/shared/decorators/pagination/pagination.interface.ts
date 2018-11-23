export interface PaginationParams {
  items?: number;
  page?: number;
  order?: string;
  orderby?: string;
}

export interface PaginationOptions {
  limit: number;
  skip: number;
  sort: string;
  lean: boolean;
}