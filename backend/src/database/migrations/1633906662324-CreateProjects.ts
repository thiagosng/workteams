import {MigrationInterface, QueryRunner, Table , TableForeignKey, TableIndex} from "typeorm";

export class CreateProjects1633906662324 implements MigrationInterface {
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
      
          await queryRunner.createIndex(
            'projects',
            new TableIndex({
              name: 'idx_project_2',
              columnNames: ['description'],
            }),
          );

          await queryRunner.createIndex(
            'projects',
            new TableIndex({
              name: 'idx_project_3',
              columnNames: ['start_date'],
            }),
          );

          await queryRunner.createIndex(
            'projects',
            new TableIndex({
              name: 'idx_project_4',
              columnNames: ['end_date'],
            }),
          );

          await queryRunner.createIndex(
            'projects',
            new TableIndex({
              name: 'idx_project_5',
              columnNames: ['end_date'],
            }),
          );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('projects');
    }

}
