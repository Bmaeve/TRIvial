**README : Traitements PostGIS - Projet de Fin d'Etudes - TRIvial**    
=======
Etudiant·e·s en Master 2/troisième année d'Ingénieur·e, spécialité **Technologies des Systèmes d'Information (TSI)**, à l'ENSG-Géomatique.

*Ce README est un fichier contenant les informations sur le traitements PostGIS appliqués aux données.*

**Avant-propos**  
*Ce module permet de pré-calculer les tables de la Base de Données utiles pour l'application TRIvial à partir de commandes postGIS.
Il s'agit cependant d'une version incomplète, le résultat obtenu n'étant pas encore intégrable au projet.*
*Ces explications concernent les traitements des données de la ville de Pau. Elles sont normalement applicables à des données relatives à d'autres départements modulo quelques changements.*

## Table des matières
1. [Etapes-de-traitements](#Etapes-de-traitements)
2. [Améliorations](#Améliorations)
3. [PostGIS](#PostGIS)
4. [Installation](#Installation)

# Etapes de traitements
Les étapes suivantes sont implémentées dans le script index.js :
- Import bati de la BDTopo : permet d'ajouter une table contenant tous les bâtiments surfaciques dans la Base de Données :
    - Import de la partie bati de la BDTopo sur une Base de Données associée ;
    - Fusion de toutes les tables bati en une unique table ;
    - Copie de cette table dans la Base de Données TRI.

- Import PAI de la BDTopo : permet d'ajouter une table contenant tous les points d'intéret dans la Base de Données, ce sont ces points qui sont utilisés dans la BD TRI dans les couches ponctuelles :
    - Import de la partie PAI de la BDTopo sur une Base de Données associée ;
    - Fusion de toutes les tables PAI en une unique table ;
    - Copie de cette table dans la Base de Données TRI.

- Import des données extérieures, la jointure avec les données TRI n'est pas implémentée :
    - Import de la donnée finess ;
    - Import de la donnée menjva.

- Création de la Base de Données TRI :
    - Import des données TRI ;
    - Pour chaque table TRI ponctuelle, jointure avec les PAI de la BDTopo pour obtenir une information (donnée TRI enrichie) ;
    - Fusion de toutes les tables TRI ponctuelles ;
    - Jointure entre la table TRI ponctuelle et la table Bati de la BD topo dans une nouvelle table ;
    - Renommage des colonnes de géométrie de cette table TRI enrichie pour définir la géométrie surfacique (originalement celle de la BDTOpo) par défaut ;
    - Fusion de cette table avec toutes les tables surfaciques.
  
On obtient ainsi automatiquement une table des données TRI enrichies par la BD topo.
***

# Améliorations
Pour intégrer la Base de Données produite par ce script dans l'application TRIvial, il est nécessaire de développer ces nouvelles features :

- Création des Bases de Données automatisée ;
- Jointure de la Base de Données avec d'autres sources (notamment menjva et finess déjà importées), ou possibilité de réaliser ces jointures "à la volée" dans l'application ;
- Division de la Base de Données en différents enjeux (santé, patrimoine, etc.) ;
- Ajout de la gestion des scénarios et des données TRI linéaires ;
- Calcul des hauteurs ou des données touchées ;
- Ce script reste assez rigide et ne s'adapte pas forcément aux données en entrées.
*** 

# PostGIS
PostGIS est une extension de PostgreSQL, elle permet la manipulation de données géographiques dans les Bases de Données à partir de commandes SQL. Cette extension doit être ajoutée dans chaque Base de Données utilisée.
***

# Installation
- A partir de pgAdmin, créer chaque Base de Données présente dans le script index.js (par exemple pour Pau : BDTopoBatiPau2012, BDTopoPAIPau2012, TRIPau) ;  
- Ajouter l'extension PostGIS pour chacune d'elles :   
![adding extension](./images/extension.png)  
- A la racine de ce dossier, créer un dossier *input* et y ajouter les données à importer dans la Base de Données, l'exemple ci-desous reprend la situation pour le TRI de Pau :
    - FRF_TRI_PAU : [donnée TRI](https://www.georisques.gouv.fr/donnees/bases-de-donnees/zonages-inondation-rapportage-2020) (contient tous les shapefile de la donnée TRI)
    - BDTOPOPau2012 : [BD Topo du département concerné](https://geoservices.ign.fr/bdtopo) ,la version dépend des données TRI (contient les dossiers A_RESEAU_ROUTIER, B_VOIES...)
    - etalab.csv : [données liées à la santé FINESS](https://www.data.gouv.fr/fr/datasets/finess-extraction-du-fichier-des-etablissements/)
    - menjva.csv : [données liées à l'enseignement](https://data.education.gouv.fr/explore/dataset/fr-en-adresse-et-geolocalisation-etablissements-premier-et-second-degre/table/?disjunctive.nature_uai&disjunctive.nature_uai_libe&disjunctive.code_departement&disjunctive.code_region&disjunctive.code_academie&disjunctive.secteur_prive_code_type_contrat&disjunctive.secteur_prive_libelle_type_contrat&disjunctive.code_ministere&disjunctive.libelle_ministere)  
- Dans le fichier poolPg.js, modifier les valeurs pour qu'elles correspondent à la Base de Données (user, password et host) ;  
- A la racine de ce fichier, lancer dans une invite de commande :
```
npm run start
```





