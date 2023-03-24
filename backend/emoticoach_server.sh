#!/bin/bash

# Default Values
ENVIRONMENT="dev"
DOCKER="true"
SHUTDOWN="0"

# Accepted Values
ENVIRONMENT_VALUES=("dev" "prod" "development" "production")
DOCKER_VALUES=("true" "false" "1" "0")

# Parse Arguments
while getopts ":d:e:s:" opt; do
    case $opt in
        e)
            if [[ " ${ENVIRONMENT_VALUES[@]} " =~ " ${OPTARG} " ]]; then
                ENVIRONMENT="$OPTARG"
            else
                echo "Invalid argument. Please use one of these values: ${ENVIRONMENT_VALUES[@]}"
                exit 1
            fi
            ;;
        d)
            if [[ " ${DOCKER_VALUES[@]} " =~ " ${OPTARG} " ]]; then
                DOCKER="$OPTARG"
            else
                echo "Invalid argument. Please use one of these values: ${DOCKER_VALUES[@]}"
                exit 1
            fi
            ;;
        s)
            SHUTDOWN="1"
            ;;
        \?)
            echo "Invalid option: -$OPTARG" >&2
            echo "Usage: $(basename $0) [-d argument] [-e argument] [-s]" >&2
            exit 1
            ;;
    esac
done


# Docker Container (Dev) - DEFAULT CONDITION
if [[ "$DOCKER" == "1" ] || [ "$DOCKER" == "true" ]] && \
    [[ "$ENVIRONMENT" == "dev" ] || [ "$ENVIRONMENT" == "development" ]]; then

    # Shutdown Service
    if [ "$SHUTDOWN" == "1"]; then
        docker compose up -f ./deployment/docker-compose.dev.yml stop
        kill $(cat .updater_dev)
        rm -rf .updater_dev
        exit 0
    fi
    
    # Deploy dev container
    docker compose --env-file .env.dev -f ./deployment/docker-compose.dev.yml up -d --build

    # Deploy Flask Service
    nohup python ./development/update_container.py $(readlink -f .env.template) $(readlink -f ./deployment/docker-compose.dev.yml)> /dev/null 2>&1 &

    # Record PID of update service
    echo $! > .updater_dev

fi


# Docker Container (Prod)
if [[ "$DOCKER" == "1" ] || [ "$DOCKER" == "true" ]] && \
    [[ "$ENVIRONMENT" == "prod" ] || [ "$ENVIRONMENT" == "production" ]]; then

    # Shutdown Service
    if [ "$SHUTDOWN" == "1"]; then
        docker compose -f ./deployment/docker-compose.prod.yml stop
        exit 0
    fi

    # Deploy prod container
    docker compose --env-file .env.prod -f ./deployment/docker-compose.prod.yml up -d --build

fi


# Standalone (Dev)
if [[ "$DOCKER" == "0" ] || [ "$DOCKER" == "false" ]] && \
    [[ "$ENVIRONMENT" == "dev" ] || [ "$ENVIRONMENT" == "development" ]]; then

    # Shutdown Service
    if [ "$SHUTDOWN" == "1"]; then
        systemctl stop emotidev.service
        exit 0
    fi

    # Set environmental variables
    source .env.dev

    # Copy Unit Service to systemd
    cp ./update/scripts/emotidev.service /etc/systemd/system

    # Reload systemd unit files
    systemctl daemon-reload

    # Start Emotidev service
    systemctl start emotidev.service

fi


#  Standalone (Prod)
if [[ "$DOCKER" == "0" ] || [ "$DOCKER" == "false" ]] && \
    [[ "$ENVIRONMENT" == "prod" ] || [ "$ENVIRONMENT" == "production" ]]; then
    
    # Shutdown Service
    if [ "$SHUTDOWN" == "1"]; then
        kill $(cat .deploy_prod)
        rm -rf .deploy_prod
        exit 0
    fi

    # Set environmental variables
    source .env.prod

    # Deploy prod standalone
    nohup gunicorn emoticoach.wsgi:application --bind  0.0.0.0:1616 > /dev/null 2>&1 &
    
    # Record PID of production service
    echo $! > .deploy_prod
fi
