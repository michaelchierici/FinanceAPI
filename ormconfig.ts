[
  {
    name: "financeapi",
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "root",
    password: "root",
    database: "node_typeorm",
    entities: ["./src/app/entities/**/*.ts"],
    migrations: ["./src/migrations/**/*.ts"],
    cli: {
      migrationsDir: "./src/migrations/",
    },
  },
];
