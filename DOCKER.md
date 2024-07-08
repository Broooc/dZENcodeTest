# Docker

This is an instruction for starting this app in the docker container


First: you need to build the docker image with that command:

docker build . -t _image-name_:v1

After that, you need to start the docker container:

docker run --add-host=host.docker.internal:host-gateway -d -p 5000:5000 -p 443:443 --env-file ./.env _image-name_:v1

*Note*

If you don't want to start this app in the docker container, change HOST variable value in the .env file from __host.docker.internal__ to __localhost__