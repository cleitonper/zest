import { createParamDecorator } from '@nestjs/common';

/**
 * Filter is a decorator used for generate
 * a list of filters to be used by database queries.
 *
 * @param { string[] } avaliableFilters list of filters to be searched in query parameters
 *
 * @example @Filter['_id', 'name', 'email']
 *
 * @return { object } returns an object containig a list of filters or an empty object.
 */

export const Filter = createParamDecorator((avaliableFilters: string[], { query }) => {
  return avaliableFilters
    .reduce((filters, filter) => {
      if (query[filter]) filters[filter] = query[filter];
      return filters;
    }, {});
});