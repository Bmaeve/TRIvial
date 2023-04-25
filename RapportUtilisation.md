**Rapport d'Utilisation - Projet de Fin d'Etudes - TRIvial** 
=======
Etudiant·e·s en Master 2/troisième année d'Ingénieur·e, spécialité **Technologies des Systèmes d'Information (TSI)**, à l'ENSG-Géomatique.

*Ce rapport ou tutoriel d'utilisation est un fichier contenant des informations sur l'utilisation de notre preuve de concep, les autres fichiers du même répertoire et le contenu du rendu de notre projet.*

## Table des matières
1. [Deploiement](#Deploiement)
2. [Informations](#Informations)
3. [Description](#Description)
4. [Pré-requis](#Pré-requis)
5. [Contenu](#Contenu)


# Deploiement
Se rendre sur le [Tutoriel d'Installation](https://github.com/Bmaeve/TRIvial/blob/dev/README.md).
***

# Informations
#### **Auteur·rice·s** :
Emma BOLMIN, Jonathan-Boris OUEDRAOGO, Baptiste RIVIERE et Maeve BLAREL, étudiant·e·s en Master 2/troisième année d'Ingénieur·e, spécialité **Technologies des Systèmes d'Information (TSI)**, à l'ENSG-Géomatique.
#### **Commanditaires** :
Quentin BOUILLAGUET, Line GALLEN et Madec GERMERIE-GUIZOUARN, Ingénieur·e·s à l'IGN.
#### **Responsable pédagogique de la formation TSI** :
Victor COINDET, responsable de la filière TSI.
#### **Durée du projet** :
20 mars 2023 - 28 avril 2023.
#### **URL du site, de la solution** :
[Preuve de concept TRIvial](http://localhost:8080/TRIvial).
#### **Le projet et ses objectifs** :
Ce projet a été réalisé dans le cadre du module Projet de Fin d'Etudes de la formation TSI. Nous intégrons le projet INONDATA de l'IGN. L'objectif est de réaliser un prototype visuel permettant l'aide à la gestion de crises liées aux inondations et aux submersions marines.
#### **Langages utilisés** :
+ HTML5, CSS3, XML ;
+ JavaScript ;
+ PHP, PostgreSQL/PostGIS ;
+ LaTeX, Markdown.
#### **Logiciels utilisés** :
+ FileZilla ;
+ GitHub ;  
+ Office ;
+ Overleaf ;
+ phpPgAdmin ;
+ Visual Studio Code and/or Atom.
#### **Données utilisées** :
Nous utilisons des données TRI ouvertes sur la ville de Paris (75), des données de recoupements provenant de diverses sources (site SEVEZO, données MENJVA, données FINESS BD TOPO, etc. (découvertes lors du Benchmarking)).
#### **Récupération du projet** :
Aller vers https://github.com/Bmaeve/TRIvial.git et télécharger le ZIP du projet.
#### **Responsive?** :
Oui, il est responsive.
***

# Description
La promo de TSI (Technologies des Systèmes d'Information) de l'École Nationale des Sciences Géographiques (ENSG) ont été invité à participer au Projet de Fin d'Etudes (PFE) par la rencontre d'un commanditaire de projet. Le projet consiste à développer un prototype/une solution permettant la visualisation 2D/3D et l'analyse d'un territoire lors de la gestion d'une crise. En utilisant les différentes architectures, infrastructures et technologies de développement et la gestion de projet approchées en cours, nous avons implémenté cette solution concernant la gestion du risque Inondation.

TRIvial s'intègre dans le projet INONDATA de l'IGN. Il s'agit d'un prototype visuel, une preuve de concept sur un modèle déjà calculé. L'objectif est d'apporter une visualisation pour représenter les différents impacts des scénarios d’inondations/crues par rapport aux données TRI. En effet, les données représentées dans la solution proviennent de Bases de Données retravaillées et recoupées.
***

# Pré-requis
+ Une connection internet pour l'affichage de la solution ;
+ Un espace en local pour stocker les données ;
+ Un logiciel Docker Desktop ;
+ Un moteur de recherche (éviter Microsoft Edge and Internet Explorer).
***

# Contenu
Vous trouverez ci-dessous une liste de tous les fichiers, documents et sous-dossiers de ce répertoire.
+ Un dossier **API** contenant les fichiers liés à notre API :
    + Un dossier **bin** contenant des configurations de dépendances ;
    + Un dossier **dataset** contenant un fichier de test sur les bâtiments remarquables ;
    + Un dossier **js** contenant des fichiers Javascript (requêtes SQL) nécessaires au fonctionnement de l'API ;
    + Un dossier **parameters** contenant diverses fichiers de paramètres nécessaires au fonctionnement de l'API ;
    + Un dossier **routes** contenant d'autres fichiers Javascript (requêtes SQL) nécessaires au fonctionnement de l'API ;
    + Un dossier **test** contenant un fichier comportant quelques tests pour vérifier le fonctionnement de l'API ;
    + Un dossier **views** contenant les fichiers pug;
    + Un dossier **parameters** contenant diverses fichiers de paramètres nécessaires au fonctionnement de l'API ;
    + Un fichier *Dockerfile* ;  
    + Un fichier *README.md* ;  
    + Un fichier *TRIvialAPI.json* ;  
    + Un fichier *TRIvialAPI.yaml* ;  
    + Un fichier *app.js* ;  
    + Un fichier *package-lock.json* ;  
    + Un fichier *package.json*. 
+ Un dossier **database** contenant les fichiers liés à notre Base de Données :
    + Un dossier **data-test** contenant quelques tests liés à la BDD ;
    + Un dossier **tools** contenant des outils concernant la fabrication et l'écrire de la BDD ;
    + Un fichier *Dockerfile* ;  
    + Un fichier *open_data.sql* qui est la BDD ;  
    + Un fichier *tutoPostGIS.md*. 
+ Un dossier **front** contenant les fichiers de script du Front-end :
    + Un dossier **public** contenant quelques tests liés à la BDD ;
    + Un dossier **src** contenant le code source du front de l'application (visuel, côté client) ;
        + Un dossier **assets** contenant des fichiers d'image et de gestion des pages ;
        + Un dossier **components** contenant des dossiers (Analyse, Secours, Comparaisons, Login, etc.) de scripts Javascript liés à chacune des pages de notre application ;
        + Un dossier **css** contenant un script CSS ;
        + Un dossier **js** contenant des scripts Javascript ;
        + Un dossier **router** ;
        + Un dossier **views** ;
        + Un fichier *App.vue* ;
        + Un fichier *main.js*.
    + Un dossier **test** contenant un fichier de tests ;
    + Un fichier *Dockerfile* ;  
    + Un fichier *README.md* ;  
    + Un fichier *babel.config.js.md* ;  
    + Un fichier *jsconfig.json* ;  
    + Un fichier *package-lock.json* ;  
    + Un fichier *package.json* ;
    + Un fichier *vue.congif.js*.
+ Un fichier *RapportUtilisation.md* contenant le tuto d'Utilisation, ainsi que le contenu détaillé de notre répertoire de projet ;
+ Un fichier *README.md* contenant le rapport d'Installation ;
+ Un fichier *docker-compose-test.yml* ;
+ Un fichier *docker-compose.yml* permettant d'orchester les conteneurs du Docker et ses images (ensemble des ressources et services nécessaires à la réalisation de la solution) ;
+ Un dossier **preTreatmentsDatabase/PostGIStreatments** contenant le module permettant le calcul des tables de la BDD (version incomplète, non-intégrée au projet) ;
+ Un dossier **livrables** contenant les livrables attendus :
    + Un fichier *PFE-TRIvial_analysis-report-Emma-Boris-Baptiste-Maeve.pdf* : le rapport d'analyse ; 
    + Un fichier *PFE-TRIvial_demo-Emma-Boris-Baptiste-Maeve.mp4* : la vidéo de démonstration de la preuve de concep TRIvial.
***






