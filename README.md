## Readme

## Development
`NODE > 18.13.0`

don't use `npm` use `yarn`!

`yarn install`
`yarn run email-install-dependencies`
`yarn run db:migrate`
`yarn run dev`

### Env
1. Add `.env.local` file to root of project and fill with correct values
2. To work with emails on production you need `RESEND_API_KEY` (free to use https://resend.com/overview)
3. To work with Uploading files you need `UPLOADTHING_SECRET` `UPLOADTHING_APP_ID` (free to use https://uploadthing.com/)

### PROD Vars

For deploying on prod you can use for example: railway.app (where you can add POSTGRES DB)

All Variables that you need to add to prod env:

```text
DATABASE_URL=${{Postgres.DATABASE_URL}}
PGDATABASE=${{Postgres.PGDATABASE}}
PGHOST=${{Postgres.PGHOST}}
PGPASSWORD=${{Postgres.PGPASSWORD}}
PGPORT=${{Postgres.PGPORT}}
PGUSER=${{Postgres.PGUSER}}
PORT=3000
RESEND_API_KEY=xxxx
SESSION_SECRET_KEY=xxxx
UPLOADTHING_APP_ID=xxxx
UPLOADTHING_SECRET=xxxx
```

### DB locally:

// .env.local
`DATABASE_URL=postgresql://postgres@localhost:5431/app-name`

- can use https://dbngin.com/ to manage local postgres db
- (the most important is the same port in .env.local and dbngin DB instance)
- don't forget to Start instance in dbngin

### Email:
to work correctly NODE > 18.13.0

to start dev server
`yarn run email-install-dependencies`
`yarn run email`

starts on http://localhost:3009/

