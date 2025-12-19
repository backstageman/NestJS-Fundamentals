import { MigrationInterface, QueryRunner } from 'typeorm';

export class ChangeCoffeeName1766178449971 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    // 1️⃣ 新增 title
    await queryRunner.query(`
      ALTER TABLE "coffee"
      ADD COLUMN "title" character varying NOT NULL
    `);

    // 2️⃣ 新增 description（可为空）
    await queryRunner.query(`
      ALTER TABLE "coffee"
      ADD COLUMN "description" text
    `);

    // 3️⃣ （可选）如果你想保留旧数据，从 name 迁移到 title
    await queryRunner.query(`
      UPDATE "coffee"
      SET "title" = "name"
    `);

    // 4️⃣ 删除旧字段 name
    await queryRunner.query(`
      ALTER TABLE "coffee"
      DROP COLUMN "name"
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    // 回滚：加回 name
    await queryRunner.query(`
      ALTER TABLE "coffee"
      ADD COLUMN "name" character varying NOT NULL
    `);

    // 把 title 的值还原给 name
    await queryRunner.query(`
      UPDATE "coffee"
      SET "name" = "title"
    `);

    // 删除新字段
    await queryRunner.query(`
      ALTER TABLE "coffee"
      DROP COLUMN "title"
    `);

    await queryRunner.query(`
      ALTER TABLE "coffee"
      DROP COLUMN "description"
    `);
  }
}
