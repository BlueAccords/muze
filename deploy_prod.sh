#!/bin/bash

ssh -v $DO_USERNAME@$DO_HOSTNAME << EOF

echo '1. Updating sources'
cd $DO_MUZE_PATH
git pull

echo "2. Restart PM2 Node process"
npm install
npm run deploy
pm2 restart $DO_PROCESS

echo $DO_PROCESS
echo 'Done!'

EOF

