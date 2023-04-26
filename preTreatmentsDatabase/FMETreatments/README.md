**README : traitements FME - Projet de Fin d'Etudes - TRIvial**    
=======
Etudiant·e·s en Master 2/troisième année d'Ingénieur·e, spécialité **Technologies des Systèmes d'Information (TSI)**, à l'ENSG-Géomatique.

*Ce README est un fichier contenant les informations sur les traitements FME appliqué aux données.*

**Avant-propos**  
*Ces explications concernent les traitements des données de la ville de Paris. Elles sont normalement applicables à des données relatives à d'autres départements modulo quelques changements.*

## Table des matières
1. [Mise-en-place-de-l-arborescence-du-pré-traitements](#Mise-en-place-de-l-arborescence-du-pré-traitements)
2. [Traitements-via-QGIS](#Traitements-via-QGIS)
3. [Traitements-via-FME](#Traitements-via-FME)

# Mise en place de l arborescence du pré-traitements
Importer le dossier compressé *FMETreatments.zip* se trouvant dans le dossier *preTreatmentsDatabase/FMETreatments*.
Extraire le dossier *FMETreatments* et se placer à la racine de ce dossier.
Se placer à la racine du dossier *input* et ajouter les données suivantes importées (l'exemple ci dessous reprend la situation pour le TRI de Paris) :
- tri_2020_sig_di_75 : [Données TRI](https://www.georisques.gouv.fr/donnees/bases-de-donnees/zonages-inondation-rapportage-2020) (contient tous les shapefile des données TRI) ;  
- BDTOPO_2-0_TOUSTHEMES_SHP_LAMB93_D075_2008-09-14 : [BD Topo de la ville de Paris concerné](https://wxs.ign.fr/859x8t863h6a09o9o6fy4v60/telechargement/inspire/BDTOPO-TOUSTHEMES-2008-09-14$BDTOPO_2-0_TOUSTHEMES_SHP_LAMB93_D075_2008-09-14/file/BDTOPO_2-0_TOUSTHEMES_SHP_LAMB93_D075_2008-09-14.7z), la version dépend des données TRI.

Dans ce même dossier *intput*, créer un dossier DataENS, se placer à sa racine et ajouter les données suivantes importées au format shapefile (l'exemple ci desous reprend la situation pour la ville de Paris) :
- fr-en-adresse-et-geolocalisation-etablissements-premier-et-second-degre : [Données MENJVA](https://data.education.gouv.fr/explore/dataset/fr-en-adresse-et-geolocalisation-etablissements-premier-et-second-degre/export/?disjunctive.nature_uai&disjunctive.nature_uai_libe&disjunctive.code_departement&disjunctive.code_region&disjunctive.code_academie&disjunctive.secteur_prive_code_type_contrat&disjunctive.secteur_prive_libelle_type_contrat&disjunctive.code_ministere&disjunctive.libelle_ministere&refine.code_departement=075&dataChart=eyJxdWVyaWVzIjpbeyJjb25maWciOnsiZGF0YXNldCI6ImZyLWVuLWFkcmVzc2UtZXQtZ2VvbG9jYWxpc2F0aW9uLWV0YWJsaXNzZW1lbnRzLXByZW1pZXItZXQtc2Vjb25kLWRlZ3JlIiwib3B0aW9ucyI6eyJkaXNqdW5jdGl2ZS5uYXR1cmVfdWFpIjp0cnVlLCJkaXNqdW5jdGl2ZS5uYXR1cmVfdWFpX2xpYmUiOnRydWUsImRpc2p1bmN0aXZlLmNvZGVfZGVwYXJ0ZW1lbnQiOnRydWUsImRpc2p1bmN0aXZlLmNvZGVfcmVnaW9uIjp0cnVlLCJkaXNqdW5jdGl2ZS5jb2RlX2FjYWRlbWllIjp0cnVlLCJkaXNqdW5jdGl2ZS5zZWN0ZXVyX3ByaXZlX2NvZGVfdHlwZV9jb250cmF0Ijp0cnVlLCJkaXNqdW5jdGl2ZS5zZWN0ZXVyX3ByaXZlX2xpYmVsbGVfdHlwZV9jb250cmF0Ijp0cnVlLCJkaXNqdW5jdGl2ZS5jb2RlX21pbmlzdGVyZSI6dHJ1ZSwiZGlzanVuY3RpdmUubGliZWxsZV9taW5pc3RlcmUiOnRydWV9fSwiY2hhcnRzIjpbeyJhbGlnbk1vbnRoIjp0cnVlLCJ0eXBlIjoibGluZSIsImZ1bmMiOiJBVkciLCJ5QXhpcyI6ImNvb3Jkb25uZWVfeCIsInNjaWVudGlmaWNEaXNwbGF5Ijp0cnVlLCJjb2xvciI6IiMxYjFiMzUifV0sInhBeGlzIjoiZGF0ZV9vdXZlcnR1cmUiLCJtYXhwb2ludHMiOiIiLCJ0aW1lc2NhbGUiOiJ5ZWFyIiwic29ydCI6IiJ9XSwiZGlzcGxheUxlZ2VuZCI6dHJ1ZSwiYWxpZ25Nb250aCI6dHJ1ZX0%3D) ;  
- fr-en-annuaire-education: [Données MENJVA](https://data.education.gouv.fr/explore/dataset/fr-en-annuaire-education/export/?disjunctive.nom_etablissement&disjunctive.type_etablissement&disjunctive.code_postal&disjunctive.code_commune&disjunctive.nom_commune&disjunctive.code_departement&disjunctive.code_academie&disjunctive.appartenance_education_prioritaire&disjunctive.type_contrat_prive&disjunctive.libelle_departement&disjunctive.libelle_academie&disjunctive.libelle_region&disjunctive.ministere_tutelle&disjunctive.code_type_contrat_prive&disjunctive.pial&refine.code_departement=075).

Dans ce même dossier *intput*, créer un dossier DataSAN, se placer à sa racine et ajouter les données suivantes importées au format csv (l'exemple ci desous reprend la situation pour la ville de Paris) :
- etalab-stock-et-historique-2004-2022 : [Données FINESS](https://www.data.gouv.fr/fr/datasets/finess-extraction-du-fichier-des-etablissements/). Télécharger le dossier compressé *HISTORIQUE des Etablissements période : 2004-2022* et le dezipper dans le dossier *DataSAN* ;
- ars_france_finess_code4000_tot_capa_autorisee_t.csv : [Données FINESS](https://catalogue.atlasante.fr/geosource/panierDownloadFrontalParametrage?LAYERIDTS=1703). Sélectionner le format csv et télécharger les données et les placer dans le dossier *DataSAN*.

Créer un dossier *output* pour les fichiers de sortie créés par FME.
***

# Traitements via QGIS
Avant d'implémenter les traitements via FME, il est important de réaliser des pré-traitements en utilisant le logiciel QGIS.
Créer une couche, via QGIS (Menu Vecteur, Outils de Gestion de données, Fusionner des couches vecteur). Cette couche fusionne les couches de la BD Topo suivantes : PISTE_AERODROME, TERRAIN_SPORT, RESERVOIR, CONSTRUCTION_SURFACIQUE, CIMETIERE, BATI_REMARQUABLE, BATI_INDUSTRIL, BATI_INDIFFERENCIE (tous les fichiers du dossier *input/BDTOPO_2-0_TOUSTHEMES_SHP_LAMB93_D075_2008-09-14/BDTOPO/1_DONNEES_LIVRAISON_2019-05-00233/BDT_2-0_SHP_LAMB93_D075-ED083/E_BATI* sauf CONSTRUCTION_LINEAIRE et CONSTRUCTION_PONCTUELLE). Importer, dans le dossier *input/dataCreated* existant, la couche fusionnée au format shapefile sous le nom *BATIS.shp*.
***

# Traitements via FME
#### Création des données Enjeux :
- Ouvrir le fichier FME *traitement_Enjeux.fmw* ;
- Lancer le traitement FME (bouton RUN) ;
- Le dossier output doit alors comprendre les fichiers shapefile suivants (les fichiers de données de chaque enjeux) : *ADMIN.shp*, *AUTRE.shp*, *DEF.shp*, *ENS.shp*, *INDUS.shp*, *PATRIM.shp*, *SAN.shp*, *TRANS_l.shp*, *TRANS_s.shp*.
  
    
#### Création des données Scénarios :
- Ouvrir le fichier FME *traitement_Scénarios.fmw* ;
- Lancer le traitement FME (bouton RUN) ;
- Le dossier output doit alors comprendre le fichier shapefile suivant (fichiers de données sur les scénarios) : *SCENARIOS.shp*.

On obtient ainsi les tables nécéssaires à la création de la Base des Données.
***



