#!/bin/sh
if [ "$CODEBUILD_BUILD_SUCCEEDING" = "1" ]
then
  rm -rf node_modules
  npm i --production
  npm run build
  aws s3 cp build s3://$BUCKET_NAME --recursive
  aws s3 cp build/index.html s3://$BUCKET_NAME/index.html --metadata-directive REPLACE --cache-control no-cache
  aws cloudfront create-invalidation --distribution-id $DISTRIBUTION_ID --paths "/*"
fi