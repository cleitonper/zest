#!/bin/sh

echo;

if [ $TRAVIS_BRANCH != 'master' ];
then
  export HEROKU_APP_NAME=$HEROKU_APP_NAME-preview;
fi

# Colors
YELLOW='\033[1;33m'
GREEN='\033[1;32m'
NC='\033[0m'


echo "${YELLOW}Deployment environment variables${NC}";
echo "$ export ${GREEN}TRAVIS_BRANCH${NC}=$TRAVIS_BRANCH";
echo "$ export ${GREEN}HEROKU_APP_NAME${NC}=$HEROKU_APP_NAME";
echo "$ export ${GREEN}HEROKU_USERNAME${NC}=$HEROKU_USERNAME";
echo "$ export ${GREEN}APP_NAME${NC}=$APP_NAME";
echo;

echo "${YELLOW}Building Dockerfile${NC}";
echo 'docker build -t "$APP_NAME" .'
docker build -t "$APP_NAME" .

echo;

echo "${YELLOW}Signin into heroku registry${NC}";
echo '"$HEROKU_PASSWORD" | docker login --username="$HEROKU_USERNAME" --password-stdin registry.heroku.com'
echo "$HEROKU_PASSWORD" | docker login --username="$HEROKU_USERNAME" --password-stdin registry.heroku.com

echo;

echo "${YELLOW}Installing heroku CLI${NC}";
echo 'wget -qO- https://toolbelt.heroku.com/install.sh | sh'
wget -qO- https://toolbelt.heroku.com/install.sh | sh

echo;

echo "${YELLOW}Pushing container to heroku${NC}";
echo 'docker tag $APP_NAME registry.heroku.com/$HEROKU_APP_NAME/web'
docker tag $APP_NAME registry.heroku.com/$HEROKU_APP_NAME/web;
echo 'docker push registry.heroku.com/"$HEROKU_APP_NAME"/web'
docker push registry.heroku.com/"$HEROKU_APP_NAME"/web;
echo 'heroku container:release web --app $HEROKU_APP_NAME'
heroku container:release web --app $HEROKU_APP_NAME;

echo;

echo "${YELLOW}Latest releases${NC}";
heroku releases --num=2 --app=$HEROKU_APP_NAME;

echo;

echo "${GREEN}Finished (:${NC}"