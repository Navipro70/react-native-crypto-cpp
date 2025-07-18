if [ "$#" -ne 1 ]; then
  echo "Usage: $0 <patch|minor|major>"
  exit 1
fi

VERSION_TYPE=$1

if [ "$VERSION_TYPE" != "patch" ] && [ "$VERSION_TYPE" != "minor" ] && [ "$VERSION_TYPE" != "major" ]; then
  echo "Invalid version type. Use: patch, minor or major"
  exit 1
fi

yarn lint
yarn typecheck
yarn test
yarn clean
yarn prepare

NEW_VERSION=$(npm version $VERSION_TYPE --no-git-tag-version)
NEW_VERSION=${NEW_VERSION:1}

git add package.json yarn.lock
git commit -m "main: chore(release): $NEW_VERSION"
git tag "$NEW_VERSION"
git push origin main
git push origin "$NEW_VERSION"

yarn npm publish --access public