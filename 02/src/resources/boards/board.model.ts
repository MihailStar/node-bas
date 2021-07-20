import { v4 as uuid } from 'uuid';

import Column from '../columns/column.model';

type BoardOptions = {
  title: string;
  columns: Column[];
};

class Board {
  public readonly _id = uuid();
  public title: BoardOptions['title'];
  public columns: BoardOptions['columns'];

  public constructor(options: BoardOptions) {
    this.title = options.title;
    this.columns = options.columns.map((column) => new Column(column));
  }

  public static toResponse(board: Board): Omit<Board, '_id' | 'columns'> & {
    readonly id: Board['_id'];
    readonly columns: ReturnType<typeof Column.toResponse>[];
  } {
    return (({ _id, columns, ...rest }) => ({
      id: _id,
      columns: columns.map(Column.toResponse),
      ...rest,
    }))(board);
  }
}

export { BoardOptions };
export default Board;
