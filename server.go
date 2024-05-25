package main

import (
	"fmt"
	"log"
	"net/http"
	"os"

	"github.com/99designs/gqlgen/graphql/handler"
	"github.com/99designs/gqlgen/graphql/playground"
	"github.com/rahulreddy15/books-api/graph"
)

const defaultPort = "8080"

func main() {

	port := os.Getenv("PORT")
	if port == "" {
		port = defaultPort
	}

	// Make a connection with the database
	DB, err := graph.ConnectToDatabase()

	if err != nil {
		log.Fatalf("Unable to connect to the database: %s", err.Error())
	}
	fmt.Println("Successfully connected to the database")

	resolver := &graph.Resolver{
		DB: DB,
	}

	es := graph.NewExecutableSchema(graph.Config{Resolvers: resolver})
	srv := handler.NewDefaultServer(es)

	// Handler for GraphQL playground
	http.Handle("/", playground.Handler("GraphQL playground", "/query"))

	// Handler for GraphQL queries and mutations
	http.Handle("/query", srv)

	log.Printf("connect to http://localhost:%s/ for GraphQL playground", port)
	log.Fatal(http.ListenAndServe(":"+port, nil))
}
