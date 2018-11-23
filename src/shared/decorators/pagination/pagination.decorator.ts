import { createParamDecorator } from '@nestjs/common';

import { PaginationParams, PaginationOptions } from './pagination.interface';

const ORDERS = { asc: '', desc: '-' };
const FIRST_PAGE = 1;
const DEFAULT_ITEMS_LENGTH = 15;
const MAX_ITEMS_LENGTH = 100;
const DEFAULT_ORDERBY = '_id';
const DEFAULT_ORDENATION = '';

/**
 * Pagination is a decorator used for generate
 * some options to be used by **mongoose** models
 * for pagination of queries.
 *
 * @param { PaginationParams } options
 *
 * @example @Pagination({ orderby: 'email', items: 5 })
 *
 * @return { PaginationOptions } Options used by mongoose for ordenation and pagination
 */
export const Pagination = createParamDecorator((options: PaginationParams, { query }: { query: PaginationParams }): PaginationOptions => {
  let {
    page    = FIRST_PAGE,
    items   = DEFAULT_ITEMS_LENGTH,
    order   = DEFAULT_ORDENATION,
    orderby = DEFAULT_ORDERBY,
  } = { ...query, ...options };

  order = (ORDERS[order])
    ? ORDERS[order]
    : DEFAULT_ORDENATION;

  const limit = (items > MAX_ITEMS_LENGTH)
    ? MAX_ITEMS_LENGTH
    : +items;

  const skip = (page - 1) * limit;
  const sort = `${order}${orderby}`;

  return { limit, skip, sort, lean: true };
});
