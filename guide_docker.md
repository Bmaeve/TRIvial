# Déploiement de l'application

## Préparation Linux et installation docker

1. Linux upgrade

```
sudo apt-get update && sudo apt-get upgrade 
```

2. Installing Docker-engine packages

```
sudo apt-get remove docker docker-engine docker.io containerd runc

sudo apt-get install \ ca-certificates \ curl \ gnupg \ lsb-release

sudo mkdir -p /etc/apt/keyrings

sudo apt-get install curl

curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo gpg --dearmor -o /etc/apt/keyrings/docker.gpg

echo "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.gpg] https://download.docker.com/linux/ubuntu \ $(lsb_release -cs) stable" | sudo tee /etc/apt/sources.list.d/docker.list > /dev/null
```

3. Installing docker engine

```
sudo chmod a+r /etc/apt/keyrings/docker.gpg

sudo apt-get install docker.io

sudo systemctl status docker

sudo docker run hello-world
```

4. Installation des packets Docker Compose

```
sudo apt-get install docker-compose
```

## Lancement de docker

>* stopper le service postgresql pour libérer le port 5432

```
sudo service postgresql stop
```

>* mise en place du docker-compose

```
sudo docker-compose up
```

## Accès aux différents services

### accès au manager de base de données
>* http://localhost:5433
```
System: PostpreSQL
Server: db
Username: postgres
Password: postgresql
Database: open_data
```

### Accès à la base de donnée par Qgis
```
Host: localhost
Port: 5432
Username: postgres
Password: postgresql
Database: open_data
```

### Accès à l'API
>* http://localhost:3000/

### Accès à l'application
>* http://localhost:8080/TRIVial

* une visualisation plus élaborée est disponible dans la branche realisationMaquetteAnalayse
* L'ajout des données est nécéssaire à la bonne visualisation de l'application (cf ci-dessous)

## Importer les données

se rendre sur http://localhost:5433 et se connecter avec les informations données ci-dessus.

dans l'onglet à gauche, cliquer sur 'importer', puis sur 'parcourir'

importer le fichier "database/open_data.sql" en décochant "Arrêter en cas d'erreur", puis cliquer sur 'exécuter'

