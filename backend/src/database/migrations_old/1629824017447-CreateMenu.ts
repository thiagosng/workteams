import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';

export default class CreateMenu1629824017447 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'menu',
        columns: [
          {
            name: 'id',
            type: 'serial',
            isPrimary: true,
          },
          {
            name: 'children',
            type: 'int',
            isNullable: true,
          },
          {
            name: 'title',
            type: 'varchar(255)',
          },
          {
            name: 'icon',
            type: 'varchar(100)',
            isNullable: true,
          },
          {
            name: 'url',
            type: 'varchar(255)',
            isNullable: true,
          },
          {
            name: 'order',
            type: 'int',
          },
          {
            name: 'profiles',
            type: 'int[]',
            isNullable: true,
          },
        ],
      }),
      true,
    );

    await queryRunner.createForeignKey(
      'menu',
      new TableForeignKey({
        columnNames: ['children'],
        referencedColumnNames: ['id'],
        referencedTableName: 'menu',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('menu');
  }
}
