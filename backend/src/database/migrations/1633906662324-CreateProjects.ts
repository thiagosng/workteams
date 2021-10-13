import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
  TableIndex,
} from 'typeorm';

export default class CreateProjects1633906662324 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'projects',
        columns: [
          {
            name: 'id',
            type: 'serial',
            isPrimary: true,
          },
          {
            name: 'name',
            type: 'varchar(255)',
          },
          {
            name: 'description',
            type: 'varchar(255)',
          },
          {
            name: 'start_date',
            type: 'varchar(255)',
          },
          {
            name: 'end_date',
            type: 'varchar(255)',
          },
          {
            name: 'duration',
            type: 'varchar(255)',
          },
          {
            name: 'user_id',
            type: 'int',
            isNullable: true,
          },
          {
            name: 'status',
            type: 'varchar(255)',
          },
          {
            name: 'active',
            type: 'boolean',
          },
        ],
      }),
      true,
    );
    await queryRunner.createIndex(
      'projects',
      new TableIndex({
        name: 'idx_project_1',
        columnNames: ['name'],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('projects');
  }
}
