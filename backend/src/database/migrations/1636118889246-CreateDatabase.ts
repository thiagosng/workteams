import { MigrationInterface, QueryRunner } from 'typeorm';

export default class CreateDatabase1636118889246 implements MigrationInterface {
  name = 'CreateDatabase1636118889246';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "accounts" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "initialBalance" integer NOT NULL, "initialBalanceAt" integer NOT NULL, "active" integer NOT NULL, "createdBy" integer NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_5a7a02c20412299d198e097a8fe" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "projects" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "description" character varying NOT NULL, "startDate" TIMESTAMP NOT NULL DEFAULT now(), "endDate" TIMESTAMP NOT NULL DEFAULT now(), "duration" character varying NOT NULL, "status" character varying NOT NULL, "active" boolean NOT NULL, CONSTRAINT "PK_6271df0a7aed1d6c0691ce6ac50" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "projects_users_users" ("projectId" SERIAL NOT NULL, "userId" SERIAL NOT NULL, "columnX" character varying NOT NULL, "columnY" character varying NOT NULL, "columnZ" character varying NOT NULL, CONSTRAINT "PK_d440d3d6456b48050ebda33428c" PRIMARY KEY ("projectId", "userId"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "users" ("id" SERIAL NOT NULL, "profileId" integer NOT NULL, "name" character varying NOT NULL, "email" character varying NOT NULL, "password" character varying NOT NULL, "occupation" character varying NOT NULL, "departmentId" integer NOT NULL, "timeExperience" integer NOT NULL, "avatar" character varying NOT NULL, "lastAccess" TIMESTAMP NOT NULL, "active" boolean NOT NULL, "forgottenPasswordCode" character varying NOT NULL, "forgottenPasswordTime" TIMESTAMP NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "createdBy" integer NOT NULL, CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`,
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
      `ALTER TABLE "projects_users_users" ADD CONSTRAINT "FK_73f2b0c426d6dd066ce80f650cd" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "projects_users_users" ADD CONSTRAINT "FK_6eb3bd83c6d0e10011ad3eaa525" FOREIGN KEY ("projectId") REFERENCES "projects"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "users" ADD CONSTRAINT "FK_554d853741f2083faaa5794d2ae" FOREIGN KEY ("departmentId") REFERENCES "department"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
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
