# API

Ce dossier contient le script de l'API TRIvial, elle permet notamment d'accéder à la base de donnée. 

## Architecture

L'architecture du script a été générée avec express, le point d'entrée de l'application est bin/www qui renvoie vers le fichier app.js

Ce fichier renvoie alors vers les différentes routes offertes à l'utilisateur. Il s'agit d'une API REST, l'utilisateur accède ainsi aux services à partir des verbes http (post, put, get...)

Pour un traitement complexe le router va appeler un script du dossier js. Il s'agit de la partie accédant à la base de donnée ou aux fichiers système. Le fichier permettant la connexion à une base de donnée est dans ce fichier (js/poolPg)

le fichier test permet de tester l'API

## documentation

Lorsque l'application est lancée, se connecter à [http://localhost:3000/doc/](http://localhost:3000/doc/) pour accéder au "swagger" décrivant les services de l'API

