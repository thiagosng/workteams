import {MigrationInterface, QueryRunner, Table, TableIndex} from "typeorm";

export default class Comment1636302869926 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
              name: 'department',
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
                  isNullable: true,
                },
              ],
            }),
            true,
          );
          
          await queryRunner.createIndex(
            'department',
            new TableIndex({
              name: 'idx_department_1',
              columnNames: ['name'],
            }),
          );
        }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
