import { MigrationInterface, QueryRunner } from 'typeorm';

export default class RelationUserProjects1634922011390
  implements MigrationInterface
{
  name = 'RelationUserProjects1634922011390';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP INDEX "public"."idx_users_1"`);
    await queryRunner.query(`DROP INDEX "public"."idx_users_2"`);
    await queryRunner.query(`DROP INDEX "public"."idx_department_1"`);
    await queryRunner.query(`DROP INDEX "public"."idx_project_1"`);
    await queryRunner.query(
      `CREATE TABLE "projects_user_users" ("projects_id" integer NOT NULL, "users_id" integer NOT NULL, CONSTRAINT "PK_102085c2240aceecca96def8568" PRIMARY KEY ("projects_id", "users_id"))`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_4afa97f1999641c93bd5f77b27" ON "projects_user_users" ("projects_id") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_fd6593f00d50bdb7f6c5ad76e2" ON "projects_user_users" ("users_id") `,
    );
    await queryRunner.query(
      `ALTER TABLE "projects_user_users" ADD CONSTRAINT "FK_4afa97f1999641c93bd5f77b27d" FOREIGN KEY ("projects_id") REFERENCES "projects"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE "projects_user_users" ADD CONSTRAINT "FK_fd6593f00d50bdb7f6c5ad76e2d" FOREIGN KEY ("users_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "projects_user_users" DROP CONSTRAINT "FK_fd6593f00d50bdb7f6c5ad76e2d"`,
    );
    await queryRunner.query(
      `ALTER TABLE "projects_user_users" DROP CONSTRAINT "FK_4afa97f1999641c93bd5f77b27d"`,
    );
    await queryRunner.query(
      `ALTER TABLE "public"."users" DROP CONSTRAINT "FK_0921d1972cf861d568f5271cd85"`,
    );
    await queryRunner.query(
      `ALTER TABLE "public"."projects" DROP COLUMN "status"`,
    );
    await queryRunner.query(
      `ALTER TABLE "public"."projects" ADD "status" character varying(255) NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "public"."projects" DROP COLUMN "duration"`,
    );
    await queryRunner.query(
      `ALTER TABLE "public"."projects" ADD "duration" character varying(255) NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "public"."projects" DROP COLUMN "end_date"`,
    );
    await queryRunner.query(
      `ALTER TABLE "public"."projects" ADD "end_date" character varying(255) NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "public"."projects" DROP COLUMN "description"`,
    );
    await queryRunner.query(
      `ALTER TABLE "public"."projects" ADD "description" character varying(255) NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "public"."projects" DROP COLUMN "name"`,
    );
    await queryRunner.query(
      `ALTER TABLE "public"."projects" ADD "name" character varying(255) NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "public"."profiles" DROP COLUMN "name"`,
    );
    await queryRunner.query(
      `ALTER TABLE "public"."profiles" ADD "name" character varying(255) NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "public"."menu" DROP COLUMN "profiles"`,
    );
    await queryRunner.query(
      `ALTER TABLE "public"."menu" ADD "profiles" integer array`,
    );
    await queryRunner.query(`ALTER TABLE "public"."menu" DROP COLUMN "url"`);
    await queryRunner.query(
      `ALTER TABLE "public"."menu" ADD "url" character varying(255)`,
    );
    await queryRunner.query(`ALTER TABLE "public"."menu" DROP COLUMN "icon"`);
    await queryRunner.query(
      `ALTER TABLE "public"."menu" ADD "icon" character varying(100)`,
    );
    await queryRunner.query(`ALTER TABLE "public"."menu" DROP COLUMN "title"`);
    await queryRunner.query(
      `ALTER TABLE "public"."menu" ADD "title" character varying(255) NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "public"."menu" ALTER COLUMN "children" DROP NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "public"."department" DROP COLUMN "description"`,
    );
    await queryRunner.query(
      `ALTER TABLE "public"."department" ADD "description" character varying(255)`,
    );
    await queryRunner.query(
      `ALTER TABLE "public"."department" DROP COLUMN "name"`,
    );
    await queryRunner.query(
      `ALTER TABLE "public"."department" ADD "name" character varying(255) NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "public"."users" ALTER COLUMN "created_by" DROP NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "public"."users" ALTER COLUMN "updated_at" DROP DEFAULT`,
    );
    await queryRunner.query(
      `ALTER TABLE "public"."users" ALTER COLUMN "updated_at" DROP NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "public"."users" ALTER COLUMN "forgotten_password_time" DROP NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "public"."users" DROP COLUMN "forgotten_password_code"`,
    );
    await queryRunner.query(
      `ALTER TABLE "public"."users" ADD "forgotten_password_code" character varying(255)`,
    );
    await queryRunner.query(
      `ALTER TABLE "public"."users" ALTER COLUMN "last_access" DROP NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "public"."users" DROP COLUMN "avatar"`,
    );
    await queryRunner.query(
      `ALTER TABLE "public"."users" ADD "avatar" character varying(255)`,
    );
    await queryRunner.query(
      `ALTER TABLE "public"."users" ALTER COLUMN "time_experience" DROP NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "public"."users" ALTER COLUMN "department_id" DROP NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "public"."users" DROP COLUMN "occupation"`,
    );
    await queryRunner.query(
      `ALTER TABLE "public"."users" ADD "occupation" character varying(255)`,
    );
    await queryRunner.query(
      `ALTER TABLE "public"."users" DROP COLUMN "password"`,
    );
    await queryRunner.query(
      `ALTER TABLE "public"."users" ADD "password" character varying(255) NOT NULL`,
    );
    await queryRunner.query(`ALTER TABLE "public"."users" DROP COLUMN "email"`);
    await queryRunner.query(
      `ALTER TABLE "public"."users" ADD "email" character varying(255) NOT NULL`,
    );
    await queryRunner.query(`ALTER TABLE "public"."users" DROP COLUMN "name"`);
    await queryRunner.query(
      `ALTER TABLE "public"."users" ADD "name" character varying(255) NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "public"."accounts" DROP COLUMN "active"`,
    );
    await queryRunner.query(
      `ALTER TABLE "public"."accounts" ADD "active" boolean NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "public"."accounts" DROP COLUMN "initial_balance_at"`,
    );
    await queryRunner.query(
      `ALTER TABLE "public"."accounts" ADD "initial_balance_at" date`,
    );
    await queryRunner.query(
      `ALTER TABLE "public"."accounts" DROP COLUMN "initial_balance"`,
    );
    await queryRunner.query(
      `ALTER TABLE "public"."accounts" ADD "initial_balance" numeric(15,2) NOT NULL DEFAULT '0'`,
    );
    await queryRunner.query(
      `ALTER TABLE "public"."accounts" DROP COLUMN "name"`,
    );
    await queryRunner.query(
      `ALTER TABLE "public"."accounts" ADD "name" character varying(255) NOT NULL`,
    );
    await queryRunner.query(`DROP INDEX "IDX_fd6593f00d50bdb7f6c5ad76e2"`);
    await queryRunner.query(`DROP INDEX "IDX_4afa97f1999641c93bd5f77b27"`);
    await queryRunner.query(`DROP TABLE "projects_user_users"`);
    await queryRunner.query(
      `CREATE INDEX "idx_project_1" ON "public"."projects" ("name") `,
    );
    await queryRunner.query(
      `CREATE INDEX "idx_department_1" ON "public"."department" ("name") `,
    );
    await queryRunner.query(
      `CREATE INDEX "idx_users_2" ON "public"."users" ("email") `,
    );
    await queryRunner.query(
      `CREATE INDEX "idx_users_1" ON "public"."users" ("name") `,
    );
    await queryRunner.query(
      `ALTER TABLE "public"."menu" ADD CONSTRAINT "FK_2c2af15148ee26a3c7a654be4b2" FOREIGN KEY ("children") REFERENCES "menu"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE "public"."users" ADD CONSTRAINT "FK_f32b1cb14a9920477bcfd63df2c" FOREIGN KEY ("created_by") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE "public"."users" ADD CONSTRAINT "FK_0921d1972cf861d568f5271cd85" FOREIGN KEY ("department_id") REFERENCES "department"("id") ON DELETE RESTRICT ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE "public"."users" ADD CONSTRAINT "FK_23371445bd80cb3e413089551bf" FOREIGN KEY ("profile_id") REFERENCES "profiles"("id") ON DELETE RESTRICT ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE "public"."accounts" ADD CONSTRAINT "FK_6ce484b7743042752cdecc41c99" FOREIGN KEY ("created_by") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE`,
    );
  }
}
