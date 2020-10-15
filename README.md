# undigital
 
 ## Installation
 Please have a mysql server running in your local environment and create a database called
 'undigital'
 
 To install the needed dependencies, please make sure you have node running locally
 and then from the project root run:
 
 ```bash
npm install 
```

After dependencies are installed you can start the server by running (from root)

```bash
npm start
```

Next please download postman and use the postman collection file in the root of this
project to see a list of the available endpoints with prepopulated data.

The last step before you can begin playing with the endpoints is to first hit the
`Seeder` endpoint, which will create your database tables.  After than you can create
your data in whatever order you wish.

Please note that although their are foreign key relationships in the sql tables,
I have not defined those relationships in sql, so you you can insert a foreign key 
id that does not already exist.  I did so to save time and to avoid creating yet 
more work for myself.  In general I'm pretty disappointed with Node/Express - the lack
of built in orm is very inconvenient.  If I could do this over again I would have
used Elixir - `Ecto` would have saved me a lot of time.  