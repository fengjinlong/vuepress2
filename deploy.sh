
set -e

git add .

git commit -m 'date'

git push

npm run docs:build

cd docs/.vuepress/dist

git init

git add -A

git commit -m 'deploy'

git push -f git@github.com:fengjinlong/fengjinlong.github.io.git master

cd -
