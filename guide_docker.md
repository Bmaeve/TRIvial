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
>* http://localhost:8080/TRIVial/Analyse

* une visualisation plus élaborée est disponible dans la branche realisationMaquetteAnalayse
* L'ajout des données est nécéssaire à la bonne visualisation de l'application (cf ci-dessous)

## Ajouter les données

Pour l'instant une seule donnée peut être récupérée à partir de PostGIS, 
il faut donc l'importer dans la base de donnée avec QGis et avec pour nom "bati_indiferrencie"


>* la couche géographique à importer est un fichier shp de la [BDTopo de Paris](https://ensgeu-my.sharepoint.com/:w:/r/personal/baptiste_riviere_ensg_eu/_layouts/15/Doc.aspx?sourcedoc=%7B87E7474B-5D48-4A9F-8879-69F217935497%7D&file=Rapport%20SI%20ext%C3%A9.docx&action=default&mobileredirect=true). Il se trouve dans le chemin suivant :
>   * BDTOPO_2-0_TOUSTHEMES_SHP_LAMB93_D075_2008-09-14
>   * BDTOPO
>   * 1_DONNEES_LIVRAISON_2019-05-00233
>   * BDT_2-0_SHP_LAMB93_D075-ED083
>   * E_BATI
>   * BATI_INDIFFERENCIE.SHP

>* [importer un fichier shp depuis QGis](https://naysan.ca/2020/07/26/upload-a-shapefile-into-a-postgis-table-using-qgis/) (à partir de l'étape 4)


