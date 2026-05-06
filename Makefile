# Portfolio Website Development Commands

.PHONY: help build up down restart clean dev

help: ## Show this help message
	@echo "Portfolio Website Development Commands:"
	@echo ""
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | sort | awk 'BEGIN {FS = ":.*?## "}; {printf "\033[36m%-20s\033[0m %s\n", $$1, $$2}'

build: ## Build Docker container
	docker-compose build

up: ## Start the development server
	docker-compose up -d

down: ## Stop the development server
	docker-compose down

restart: ## Restart the development server
	docker-compose restart

clean: ## Remove Docker containers and images
	docker-compose down -v --rmi all

dev: ## Start development with ngrok
	@echo "Starting portfolio website..."
	$(MAKE) up
	@echo "Waiting for container to start..."
	sleep 3
	@echo "Starting ngrok tunnel..."
	./scripts/ngrok.sh

ngrok-only: ## Start ngrok tunnel only (assumes containers are running)
	@echo "Starting ngrok tunnel..."
	./scripts/ngrok.sh

logs: ## Show Docker logs
	docker-compose logs -f

shell: ## Access container shell
	docker-compose exec nginx sh

status: ## Show container status
	docker-compose ps

deploy-github: ## Deploy to GitHub Pages
	./deploy-github-pages.sh

deploy-netlify: ## Prepare for Netlify deployment
	@echo "Preparing files for Netlify deployment..."
	mkdir -p deploy
	cp -r html/* deploy/
	cp -r html/css deploy/
	cp -r html/js deploy/
	cp -r html/assets deploy/
	@echo "Files ready in 'deploy' folder"
	@echo "Upload to: https://app.netlify.com/drop"

prepare-deploy: ## Prepare files for any static hosting
	@echo "Creating deployment package..."
	mkdir -p dist
	cp -r html/* dist/
	cp -r html/css dist/
	cp -r html/js dist/
	cp -r html/assets dist/
	@echo "Deployment files ready in 'dist' folder"
