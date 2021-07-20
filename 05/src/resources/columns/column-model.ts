import { v4 as uuid } from 'uuid';

type ColumnOptions = {
  title: string;
  order: number;
};

class Column {
  public readonly _id = uuid();
  public title: ColumnOptions['title'];
  public order: ColumnOptions['order'];

  public constructor(options: ColumnOptions) {
    this.title = options.title;
    this.order = options.order;
  }

  public static toResponse(
    column: Column
  ): Omit<Column, '_id'> & { readonly id: Column['_id'] } {
    return (({ _id, ...rest }) => ({
      id: _id,
      ...rest,
    }))(column);
  }
}

export { ColumnOptions, Column };
