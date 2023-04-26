FROM postgis/postgis

#Installing the pgRouting extension to compute itineraries

RUN apt-get update && apt-get install -y postgresql-15-pgrouting

CMD ["/usr/local/bin/docker-entrypoint.sh", "postgres"]


