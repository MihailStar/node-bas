import { Entity, PrimaryGeneratedColumn, Column as ORMColumn } from 'typeorm';

@Entity()
class Task {
  @PrimaryGeneratedColumn('uuid')
  public readonly id!: string;

  @ORMColumn()
  public title!: string;

  @ORMColumn({ type: 'integer' })
  public order!: number;

  @ORMColumn()
  public description!: string;

  @ORMColumn({ type: 'varchar', nullable: true })
  public userId!: string | null;

  @ORMColumn({ type: 'varchar', nullable: true })
  public boardId!: string | null;

  @ORMColumn({ type: 'varchar', nullable: true })
  public columnId!: string | null;

  public static toResponse(task: Task): Task {
    return task;
  }
}

type TaskDTO = Omit<Task, 'id'>;

export { Task, TaskDTO };
