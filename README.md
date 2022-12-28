# Awesome To-Do App

This is a simple to-do app built with the following technologies

- Rust
- Prisma
- GraphQL
- Next.js
- Typescript
- TailwindCSS

## Requirements

- Rust
- Node.js
- Yarn

## Starting the project

1. Create a SQLite database

```sh
touch prisma/dev.db
```

2. Generate the prisma client.

```sh
cargo prisma generate
```

3. Push prisma schema to database

```sh
cargo prisma db push
```

4. Install dependencies

```sh
yarn install
```

5. Run the API

```sh
cargo run --bin api
```

6. Run the front-end app

```sh
yarn dev
```
