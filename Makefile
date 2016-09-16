all: build

start:
	node index
clear:
	rm -f dist/*

js:
	npm run js
es5:
	npm run es5
min:
	npm run min
pug:
	npm run pug
styl:
	npm run styl

build: styl pug js

watch:
	npm run stylw


.PHONY: all