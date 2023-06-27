lint:
	make -C frontend lint

install:
	npm ci

start:
	make -C frontend start

build:
	make -C frontend build-run
