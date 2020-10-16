# undigital
 
 ## Installation
 Please have a mysql server running in your local environment and create a database called
 'undigital'
 
 Include your db credentials in the config file
 
 ```bash
config/db.config.js 
```
 
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
`Seeder` endpoint, which will create your database tables.  After the tables have
been created you can add your data in whatever order you wish.

Please note that although there are foreign key relationships in the sql tables,
I have not defined those relationships in sql, so you you can insert a foreign key 
id that does not already exist.  I did so to save time and to avoid creating yet 
more work for myself.  In general I'm pretty disappointed with Node/Express - the lack
of built in orm is very inconvenient.  If I could do this over again I would have
used Elixir - `Ecto` would have saved me a lot of time. The main reason I did not
was that my personal PC is not currently setup to run elixir, but it was already 
setup to run Node.  At the time I assumed Node would be quicker as a result, but 
I now think Elixir would have been the same amount of time or faster. 

## Additional Notes
For a clearer understanding of the endpoints I recommend starting at the route file
which can be located at: 
```bash
routes/index.js
```
Also the postman collection includes dummy payloads to get you started.  All
parameters that are sent to the endpoints are sent in the body as a json blob.
I could have done actual url parameters, but keeping things consistent in the body
seemed like a better pattern.