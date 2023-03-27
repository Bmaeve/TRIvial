
## links

[docker postgis](https://registry.hub.docker.com/r/postgis/postgis/)

[postgis quickstart command lines](https://live.osgeo.org/en/quickstart/postgis_quickstart.html)

[tuto général postgis](http://postgis.fr/chrome/site/docs/workshop-foss4g/doc/creating_db.html)

[import a shp to postgis from QGis](https://naysan.ca/2020/07/26/upload-a-shapefile-into-a-postgis-table-using-qgis/)

[link postgres - node](https://blog.patricktriest.com/game-of-thrones-map-node-postgres-redis/)

## command lines

### docker

```
# creating network and volume
docker network create postgis_network
docker volume create postgis_volume

# Server container (désactiver tout service exposant sur 5432)
docker run --name postgis_server -p 5432:5432 -v pgdata:/var/lib/postgresql/data --network postgis_network -e POSTGRES_PASSWORD=password -d postgis/postgis

# Client container
docker run -it --rm --network postgis_network postgis/postgis psql -h postgis_server -U postgres
```

### postgis init

```
create database open_data;
\c open_data;
CREATE EXTENSION postgis;

create user usr_open_data with password 'passw0rd=';

GRANT USAGE, CREATE ON SCHEMA public TO usr_open_data; 
ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT UPDATE, INSERT, SELECT, DELETE ON TABLES TO usr_open_data;
ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT SELECT ON TABLES TO usr_open_data;
```

### postgis manip

```
\c open_data;
SELECT * FROM n_tri...


SELECT tri.id, cha.code_insee
FROM charron AS cha, n_tri_baie_de_l_aiguillon_enjeu_crise_p_085 AS tri
WHERE ST_Intersects(cha.geom, tri.geom) = true;

```

