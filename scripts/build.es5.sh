mkdir ./es5
touch ./es5/index.ts
cp ./src/index.ts ./es5/index.ts
sed -i '' 's/export //g' ./es5/index.ts
tsc ./es5/*.ts --outDir ./dist/es5
rm -r ./es5
