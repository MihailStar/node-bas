# Debug in Node.js

## Установка

```bash
npm i

touch .env

cat >> .env <<EOF
DB_HOST=database_host
DB=database_name
DB_USER=database_username
DB_PASS=database_password
PORT=4000
SECRET=private_key
EOF
```

## Запуск

```bash
npm start
```
