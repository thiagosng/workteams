import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
  TableIndex,
} from 'typeorm';

export default class CreateUsers1626978945344 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'users',
        columns: [
          {
            name: 'id',
            type: 'serial',
            isPrimary: true,
          },
          {
            name: 'profile_id',
            type: 'int',
          },
          {
            name: 'name',
            type: 'varchar(255)',
          },
          {
            name: 'email',
            type: 'varchar(255)',
          },
          {
            name: 'password',
            type: 'varchar(255)',
          },
          {
            name: 'avatar',
            type: 'varchar(255)',
            isNullable: true,
          },
          {
            name: 'occupation',
            type: 'varchar(255)',
            isNullable: true,
          },
          {
            name: 'department_id',
            type: 'int',
            isNullable: true,
          },
          {
            name: 'time_experience',
            type: 'int',
            isNullable: true,
          },
          {
            name: 'last_access',
            type: 'timestamp',
            isNullable: true,
          },
          {
            name: 'active',
            type: 'boolean',
          },
          {
            name: 'forgotten_password_code',
            type: 'varchar(255)',
            isNullable: true,
          },
          {
            name: 'forgotten_password_time',
            type: 'timestamp',
            isNullable: true,
          },
          {
            name: 'created_at',
            type: 'timestamp',
            default: 'now()',
          },
          {
            name: 'updated_at',
            type: 'timestamp',
            isNullable: true,
          },
          {
            name: 'created_by',
            type: 'int',
            isNullable: true,
          },
        ],
      }),
      true,
    );

    await queryRunner.createIndex(
      'users',
      new TableIndex({
        name: 'idx_users_1',
        columnNames: ['name'],
      }),
    );

    await queryRunner.createIndex(
      'users',
      new TableIndex({
        name: 'idx_users_2',
        columnNames: ['email'],
      }),
    );

    await queryRunner.createForeignKey(
      'users',
      new TableForeignKey({
        columnNames: ['profile_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'profiles',
        onDelete: 'RESTRICT',
        onUpdate: 'CASCADE',
      }),
    );

    await queryRunner.createForeignKey(
      'users',
      new TableForeignKey({
        columnNames: ['created_by'],
        referencedColumnNames: ['id'],
        referencedTableName: 'users',
        onDelete: 'RESTRICT',
        onUpdate: 'CASCADE',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('users');
  }
}
