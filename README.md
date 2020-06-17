[![CI/CD](https://github.com/kelaltech/nyala-motors/workflows/CI/CD/badge.svg)](https://github.com/kelaltech/nyala-motors/actions)

# nyala-motors

Official website of [Nyala Motors S.C.](https://www.nyalamotors.com/)

## Installation

```
yarn install
```

## Setup

1. Install [PostgreSQL v10.0+](https://www.postgresql.org/download/)
2. Create a new database in Postgres
3. Configure your environment (using a `.env` file at the root) with values for the [database connection](strapi/config/database.js) (where using a single `DATABASE_URL` value is sufficient), and [Cloudinary file storage setup variables](strapi/extensions/upload/config/settings.json).
 
## Development

To start both strapi and www in parallel:

```
yarn start
```

Or, in separate terminals:

```
yarn strapi

# and

yarn www
```

Enjoy!

---

---

© 2020 [Kelal Tech PLC](https://www.kelaltech.com/). All rights reserved.
