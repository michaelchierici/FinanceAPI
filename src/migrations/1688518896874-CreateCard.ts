import { MigrationInterface, QueryRunner, Table } from "typeorm";

export default class CreateProfile1600016576988 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "card",
        columns: [
          {
            name: "id",
            type: "uuid",
            isPrimary: true,
            generationStrategy: "uuid",
            default: "uuid_generate_v4()",
          },
          {
            name: "cardNumber",
            type: "varchar(200)",
          },
          {
            name: "limit",
            type: "varchar(200)",
          },
          {
            name: "flag",
            type: "varchar(200)",
          },
        ],
        foreignKeys: [
          {
            name: "providerCard",
            referencedTableName: "user",
            referencedColumnNames: ["id"],
            columnNames: ["user"],
            onDelete: "CASCADE",
            onUpdate: "CASCADE",
          },
        ],
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("cards");
  }
}
