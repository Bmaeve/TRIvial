1. Linux upgrade
>* sudo apt-get update && sudo apt-get upgrade 
2. Installing Docker-engine packages
>#### Preparing the directory
>* sudo apt-get remove docker docker-engine docker.io containerd runc
>* sudo apt-get install \ ca-certificates \ curl \ gnupg \ lsb-release
>* sudo mkdir -p /etc/apt/keyrings
>* sudo apt-get install curl
>* curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo gpg --dearmor -o /etc/apt/keyrings/docker.gpg
>* echo "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.gpg] https://download.docker.com/linux/ubuntu \ $(lsb_release -cs) stable" | sudo tee /etc/apt/sources.list.d/docker.list > /dev/null
>#### Installing the docker engine
>* sudo chmod a+r /etc/apt/keyrings/docker.gpg
>* sudo apt-get install docker.io
>* sudo systemctl status docker
>* sudo docker run hello-world
3. Installation des packets Docker Compose
>* sudo apt-get install docker-compose
4. Stop postgres in local machine
>* sudo service postgresql stop
### Installation of containers
>* sudo docker-compose up
### Database manager access
>* http://localhost:5433
```
System: PostpreSQL
Server: db
Username: postgres
Password: postgresql
Database: open_data
```
### Database access to Qgis

```
Host: localhost
Port: 5233
Username: postgres
Password: postgresql
Database: open_data
```

### API access
>* http://localhost:3000/

### Application access
>* http://localhost:8080/TRIVial/Analyse