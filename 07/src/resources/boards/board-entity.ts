import { Entity, PrimaryGeneratedColumn, Column as ORMColumn } from 'typeorm';

@Entity()
class Board {
  @PrimaryGeneratedColumn('uuid')
  public readonly id!: string;

  @ORMColumn()
  public title!: string;

  @ORMColumn({ type: 'json' })
  public columns!: { title: string; order: number }[];

  public static toResponse(board: Board): Board {
    return board;
  }
}

type BoardDTO = Omit<Board, 'id'>;

export { Board, BoardDTO };
