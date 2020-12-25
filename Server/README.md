# Performance Lighthouse is GOAT - Greatest Of All Time

## Sql Server Docker Installation - Mock Data

- Check Version: ```docker-compose -v```
- Check for running: ```docker-compose ps```
- Pull image: ```docker-compose up -d```
- Verify the running instance
- Get SqlServer Logs: ```docker-compose logs plhdashboardb```
- Stop the SqlServer: ```docker-compose down```
- SqlServer Bash: ```docker exec -it plhdashboardb "bash"```
- Access the instance: ```/opt/mssql-tools/bin/sqlcmd -S localhost -U SA -P I_AM_mr_React```
- View available tables: ```select name from sys.databases |_> go```
- Create a mock DB: ```create database plhdashboardb_Dev_Mock |_> go```
- Make a use: ```use plhdashboardb_Dev_Mock |_> go```
- Create a migration: ```typeorm migration:create -n Security_Questions```
- Run all migrations: ```ts-node ./node_modules/typeorm/cli.js migration:run```

## TypeORM installation process

- Create project: ```typeorm init --name server --database mssql```
- Import tsconfig: ```npm tsconfig.json```
- Update: ```yarn upgrade-interactive --latest```
- reflect-metadata install: ```npm install reflect-metadata --save```
- GQL, Express, Apollo Server download: ```npm install express apollo-server-express graphql```
- Install graphql and express type as DEV dependency: ```npm i @types/express @types/graphql --save-dev```
- Add type-graphql to avoid GQL query mess: ```npm i type-graphql```
- Password Hashing: ```npm i bcryptjs```
- Add TS dependencies for bcrypt as DEV dependencies: ```npm i @types/bcryptjs --save-dev```
- nodemon as DEV dependency: ```npm i nodemon --save-dev```
- Install JWT: ```npm i jsonwebtoken```
- Install JWT type for TS: ```npm i @types/jsonwebtoken --save-dev```
- Install DOTEnv for environment variables: ```npm i dotenv```
- Install a cookie parser to get the cookie for Refresh token: ```npm i cookie-parser```
- Add cookie parser type as a DEV dependency: ```npm i @types/cookie-parser --save-dev```

## Upgrading npm packages

- Install: ```npm i -g npm-check-updates```
- Check if any possible update available: ```ncu```
- Update all: ```ncu -u```
  
## Note

- 25/12/2020: typeorm "typeorm": "0.2.29" introduced an error, fixed in nect alpha build, please carry on with "typeorm": "0.2.28"
