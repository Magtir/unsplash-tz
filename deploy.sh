npm run build:universal && npm run generate:prerender
rm -rf ../vprod
mkdir ../vprod
cd ../vprod
git init
git remote add dokku dokku@45.67.56.70:vtour-newprod
git pull dokku master
rm -rf ./*
cd ../client
cp server.js ../vprod
cp -r dist/ ../vprod/
cp -r dist-server/ ../vprod/
cp -r static/ ../vprod/
cp ./utils/package-srv.json ../vprod/package.json
cd ../vprod
git add .
git commit -m 'prod'
git push dokku master
