.PHONY: migrateup migratedown run create-migration gqlgen

DATABASE_URL := "postgres://postgres:1234@localhost:5432/book_management_api?sslmode=disable"

run:
	go build && ./books-api

migrate-up:
	migrate -database $(DATABASE_URL) -path migrations up

migrate-down:
	migrate -database $(DATABASE_URL) -path migrations down

create-migration:
ifndef name
	@echo "Error: 'name' parameter is required. Usage: make create-migration name=<name>"
else
	migrate create -ext sql -dir migrations -seq $(name)
endif

gqlgen:
	go run github.com/99designs/gqlgen generate

%:
	@: