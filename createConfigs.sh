#!/bin/bash 

file=./.env
if [ -f "$file" ]; then
    echo "WARNING: Files already exist are you sure you want to overwrite with new passwords?"
    read -p "Continue (y/n)?" choice
    if [[ ! $choice =~ ^[Yy]$ ]]
    then
        echo "Exit"
        exit
    fi
fi

MONGO_USERNAME=$(cat /dev/urandom | tr -dc 'a-zA-Z0-9' | fold -w 12 | head -n 1)
MONGO_PASSWORD=$(cat /dev/urandom | tr -dc 'a-zA-Z0-9' | fold -w 15 | head -n 1)
JWT=$(cat /dev/urandom | tr -dc 'a-zA-Z0-9' | fold -w 50 | head -n 1)

cat > .env <<EOF
#!/usr/bin/env bash
MONGO_USERNAME=$MONGO_USERNAME
MONGO_PASSWORD=$MONGO_PASSWORD
EOF

cat > ./server/.env <<EOF
MONGODB_URI=mongodb://$MONGO_USERNAME:$MONGO_PASSWORD@mongo:27017/shoppinglist-db?authSource=admin
JWT=$JWT
NODE_ENV="development"
EOF

echo "Created config files with random credentials."
echo "Start application with: docker-compose up"