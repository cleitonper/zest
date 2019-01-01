import { createParamDecorator } from '@nestjs/common';

/**
 * Projection decorator is used for generate
 * a projection option used by mongoose
 * to select which fields will compose
 * the result of the query.
 *
 * @param { string } fieldName the query parameter name where projection is defined
 *
 * @return { string } projection definition used by mongoose methods
 * @see {@link https://mongoosejs.com/docs/api.html#query_Query-select} for more details
 */
export const Projection = createParamDecorator((fieldName = 'fields', request): string => {
  const fields: string[] | string = request.query[fieldName] || [];

  return (Array.isArray(fields))
    ? fields.join(' ')
    : fields.replace(/,/g, ' ');
});