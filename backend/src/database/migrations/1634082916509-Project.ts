import {MigrationInterface, QueryRunner, Table , TableForeignKey, TableIndex} from "typeorm";

export class Project1634082916509 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: 'project',
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
            'project',
            new TableIndex({
              name: 'idx_project_1',
              columnNames: ['name'],
            }),
          );
      
          await queryRunner.createIndex(
            'project',
            new TableIndex({
              name: 'idx_project_2',
              columnNames: ['description'],
            }),
          );

          await queryRunner.createIndex(
            'project',
            new TableIndex({
              name: 'idx_project_3',
              columnNames: ['start_date'],
            }),
          );

          await queryRunner.createIndex(
            'project',
            new TableIndex({
              name: 'idx_project_3',
              columnNames: ['end_date'],
            }),
          );

          await queryRunner.createIndex(
            'project',
            new TableIndex({
              name: 'idx_project_3',
              columnNames: ['end_date'],
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
              columnNames: ['department_id'],
              referencedColumnNames: ['id'],
              referencedTableName: 'department',
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
        //aqui concerta
        await queryRunner.dropTable('users');
    }

}
