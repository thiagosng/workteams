import { MigrationInterface, QueryRunner } from 'typeorm';

export default class CreateDatabase1636118889246 implements MigrationInterface {
  name = 'CreateDatabase1636118889246';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "accounts" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "initial_balance" integer NOT NULL, "initial_balance_at" integer NOT NULL, "active" integer NOT NULL, "created_by" integer NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_5a7a02c20412299d198e097a8fe" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "projects" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "description" character varying NOT NULL, "start_date" TIMESTAMP NOT NULL DEFAULT now(), "end_date" TIMESTAMP NOT NULL DEFAULT now(), "duration" character varying NOT NULL, "status" character varying NOT NULL, "active" boolean NOT NULL, CONSTRAINT "PK_6271df0a7aed1d6c0691ce6ac50" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "projects_users_users" ("project_id" SERIAL NOT NULL, "user_id" SERIAL NOT NULL, CONSTRAINT "PK_d440d3d6456b48050ebda33428c" PRIMARY KEY ("project_id", "user_id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "users" ("id" SERIAL NOT NULL, "profile_id" integer NOT NULL, "name" character varying NOT NULL, "email" character varying NOT NULL, "password" character varying NOT NULL, "occupation" character varying, "department_id" integer, "time_experience" integer , "avatar" character varying , "last_access" TIMESTAMP , "active" boolean NOT NULL, "forgotten_password_code" character varying , "forgotten_password_time" TIMESTAMP , "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "created_by" integer , CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "department" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "description" character varying NOT NULL, CONSTRAINT "PK_9a2213262c1593bffb581e382f5" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "menu" ("id" SERIAL NOT NULL, "children" integer NOT NULL, "title" character varying NOT NULL, "icon" character varying NOT NULL, "url" character varying NOT NULL, "order" integer NOT NULL, "profiles" integer NOT NULL, CONSTRAINT "PK_35b2a8f47d153ff7a41860cceeb" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "profiles" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, CONSTRAINT "PK_8e520eb4da7dc01d0e190447c8e" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "projects_users_users" ADD CONSTRAINT "FK_73f2b0c426d6dd066ce80f650cd" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "projects_users_users" ADD CONSTRAINT "FK_6eb3bd83c6d0e10011ad3eaa525" FOREIGN KEY ("project_id") REFERENCES "projects"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "users" ADD CONSTRAINT "FK_554d853741f2083faaa5794d2ae" FOREIGN KEY ("department_id") REFERENCES "department"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "users" DROP CONSTRAINT "FK_554d853741f2083faaa5794d2ae"`,
    );
    await queryRunner.query(
      `ALTER TABLE "projects_users_users" DROP CONSTRAINT "FK_6eb3bd83c6d0e10011ad3eaa525"`,
    );
    await queryRunner.query(
      `ALTER TABLE "projects_users_users" DROP CONSTRAINT "FK_73f2b0c426d6dd066ce80f650cd"`,
    );
    await queryRunner.query(`DROP TABLE "profiles"`);
    await queryRunner.query(`DROP TABLE "menu"`);
    await queryRunner.query(`DROP TABLE "department"`);
    await queryRunner.query(`DROP TABLE "users"`);
    await queryRunner.query(`DROP TABLE "projects_users_users"`);
    await queryRunner.query(`DROP TABLE "projects"`);
    await queryRunner.query(`DROP TABLE "accounts"`);
  }
}
