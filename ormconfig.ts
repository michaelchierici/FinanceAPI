[
  {
    name: "financeapi",
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "root",
    password: "root",
    database: "node_typeorm",
    entities: ["src/app/entity/**/*.ts"],
    migrations: ["src/migrations/**/*.ts"],
    cli: {
      migrationsDir: "./src/migrations/",
    },
  },
];
