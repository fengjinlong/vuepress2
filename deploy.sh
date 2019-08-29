
set -e

git add .
git commit -m 'add'
git push

npm run docs:build
cd docs/.vuepress/dist

git init
git add -A

dataline=$(./coMes.txt)

git commit -m dataline

git push -f git@github.com:fengjinlong/fengjinlong.github.io.git master

cd -