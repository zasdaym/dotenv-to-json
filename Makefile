build:
	@minify --output dist/ --recursive src/*

deploy: build
	@rsync --delete --recursive dist/ z-srv-1:/srv/www/dotenv-to-json/
