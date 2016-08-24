#!/bin/bash

ssh -v $DO_USERNAME@$DO_HOSTNAME << EOF

echo '1. Updating sources'
cd $DO_MUZE_PATH
git checkout --force master
git pull

echo "2. Restart apache"
sudo npm install

echo 'Done!'

EOF

