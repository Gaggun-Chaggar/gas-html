mkdir ./es5
touch ./es5/index.ts
cp ./src/index.ts ./es5/index.ts
if [[ "$OSTYPE" == "darwin"* ]]; then
  sed -i '' 's/export //g' ./es5/index.ts
else
  sed -i 's/export //g' ./es5/index.ts
fi
tsc ./es5/*.ts --outDir ./dist/es5
rm -r ./es5
