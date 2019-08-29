
set -e

git add .

cur_sec=`date '+%s'`
git commit -m cur_sec

git push

npm run docs:build
cd docs/.vuepress/dist

git init
git add -A

git commit -m 'xxxxxxxxxxxxxx'

git push -f git@github.com:fengjinlong/fengjinlong.github.io.git master

cd -