import { MigrationInterface, QueryRunner, Table, TableIndex } from 'typeorm';

export default class CreateProjects1633963888483 implements MigrationInterface {
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

    await queryRunner.createTable(
      new Table({
        name: 'projects_users_users',
        columns: [
          {
            name: 'projectId',
            type: 'int',
            isPrimary: true,
          },
          {
            name: 'userId',
            type: 'int',
            isPrimary: true,
          },
        ],
        foreignKeys: [
          {
            columnNames: ['projectId'],
            referencedColumnNames: ['id'],
            referencedTableName: 'projects',
          },
          {
            columnNames: ['userId'],
            referencedColumnNames: ['id'],
            referencedTableName: 'users',
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('projects');
  }
}
