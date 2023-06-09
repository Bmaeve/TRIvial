**README : Rapport d'Installation - Projet de Fin d'Etudes - TRIvial**    
=======
Etudiant·e·s en Master 2/troisième année d'Ingénieur·e, spécialité **Technologies des Systèmes d'Information (TSI)**, à l'ENSG-Géomatique.

*Ce fichier README ou rapport d'installation est un fichier contenant des informations sur les diverses installations nécessaires au bon fonctionnement de notre preuve de concep TRIvial. Cela permet le déploiement de notre projet/application.*

## Table des matières
1. [Préparation-Linux](#Préparation-de-Linux)
2. [Installation-de-Docker](#Installation-de-Docker)
3. [Lancement-de-Docker](#Lancement-de-Docker)
4. [Accès-aux-différents-services](#Accès-aux-différents-services)
5. [Import-des-données](#Import-des-données)


# Préparation de Linux 

### Etape 1 : Mise à jour de Linux

```
sudo apt-get update && sudo apt-get upgrade 
```


# Installation de Docker

### Etape 1 : Installation des packages Docker-engine
```
sudo apt-get remove docker docker-engine docker.io containerd runc

sudo apt-get install \ ca-certificates \ curl \ gnupg \ lsb-release

sudo mkdir -p /etc/apt/keyrings

sudo apt-get install curl

curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo gpg --dearmor -o /etc/apt/keyrings/docker.gpg

echo "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.gpg] https://download.docker.com/linux/ubuntu \ $(lsb_release -cs) stable" | sudo tee /etc/apt/sources.list.d/docker.list > /dev/null
```


### Etape 2 : Installation de Docker-engine
```
sudo chmod a+r /etc/apt/keyrings/docker.gpg

sudo apt-get install docker.io

sudo systemctl status docker

sudo docker run hello-world
```


### Etape 3 : Installation des packages Docker Compose
```
sudo apt-get install docker-compose
```


# Lancement de Docker
### Stopper le service PostgreSQL pour libérer le port 5432.
```
sudo service postgresql stop
```

### Mettre en place le Docker-compose.
```
sudo docker-compose up
```


# Accès aux différents services
### Accès au manager de Base de Données
>* http://localhost:5433
```
System: PostpreSQL
Server: db
Username: postgres
Password: postgresql
Database: open_data
```

### Accès à la Base de données par Qgis
```
Host: localhost
Port: 5434
Username: postgres
Password: postgresql
Database: open_data
```

### Accès à la documentation de l'API
>* http://localhost:3000/doc/

### Accès à l'application
>* http://localhost:8080/  
 
L'ajout des données est nécéssaire à la bonne visualisation de l'application (cf ci-après).


# Import des données
Se rendre à l'adresse *http://localhost:5433* et se connecter avec les informations données ci-dessus (dans la partie *Accès au manager de Base de Données*).  
Dans l'onglet à gauche, cliquer sur *Importer*, puis sur *Parcourir*.  
Importer le fichier se trouvant à l'arborescence *database/open_data.sql* de notre projet, décocher *Arrêter en cas d'erreur* et cliquer sur *Exécuter*.
