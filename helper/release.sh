#!/bin/sh
git checkout master;
git merge development -m 'Merge development';
PRODUCTION=1 npm run build;
git add build;
git commit -m 'deploy';
git push origin master;
git co development;
