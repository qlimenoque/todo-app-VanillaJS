docker rm -f $(docker ps -a -q ) || docker image rm $(docker images -a -q)
docker build -t web-app-side-menu .
docker run --name main -d -p 3000:80 web-app-side-menu
zip -r ../todo-app.zip .

