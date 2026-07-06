.PHONY: help dev build start lint install clean test docker-build docker-run

help:
	@echo "Klarity360 Homepage - Available commands:"
	@echo ""
	@echo "  make install      - Install npm dependencies"
	@echo "  make dev          - Start Next.js development server"
	@echo "  make build        - Create a production build"
	@echo "  make start        - Start the production server"
	@echo "  make lint         - Run linting"
	@echo "  make test         - Run unit tests with Mocha"
	@echo "  make docker-build - Build Docker image"
	@echo "  make docker-run   - Run Docker container"
	@echo ""

dev:
	npm run dev

build:
	npm run build

start:
	npm run start

lint:
	npm run lint

test:
	npm run test

docker-build:
	docker build -t klarity360-homepage .

docker-run:
	docker run -p 3000:3000 klarity360-homepage

install:
	npm install

clean:
	@echo "Cleaned up"

.DEFAULT_GOAL := help
