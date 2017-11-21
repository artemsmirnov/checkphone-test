# phonecheck

``` bash
# start postgres
docker-compose up -d postgres

# generate default state
docker-compose run state

# run ui
docker-compose up ui
# open localhost:8080 and check +12344444444

# run admin-ui
docker-compose up admin-ui
# open localhost:8090 and login with admin:admin
```
