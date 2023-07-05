import { MigrationInterface, QueryRunner, Table } from "typeorm";

export default class CreateUser1600016590838 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "user",
        columns: [
          {
            name: "id",
            type: "uuid",
            isPrimary: true,
            generationStrategy: "uuid",
            default: "uuid_generate_v4()",
          },
          {
            name: "name",
            type: "varchar(200)",
          },
          {
            name: "job",
            type: "varchar(200)",
          },
          {
            name: "age",
            type: "varchar(200)",
          },
          {
            name: "card_id",
            type: "uuid",
          },
        ],
        foreignKeys: [
          {
            name: "providerUser",
            referencedTableName: "card",
            referencedColumnNames: ["id"],
            columnNames: ["card_id"],
            onDelete: "CASCADE",
            onUpdate: "CASCADE",
          },
        ],
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("users");
  }
}
