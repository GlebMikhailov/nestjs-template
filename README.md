# NestJs Monolith Template

## Project structure

### General project structure
```
├── core  # general logic or logic not related to the client contains various application settings
│   ├── app  # classes necessary for interaction with the application
│   ├── common  # common code for all features
│   ├── config  # environmental configuration
│   ├── core.module.ts  # application module
│   ├── cors  # cors logic
│   ├── exceptions  # general exceptions
│   ├── global.module.ts  # global module, contains common classes and modules
│   ├── http  # http communication utilities
│   ├── logger  # configuration of the local logger
│   └── persistence  # database configuration 
├── features  # product features
│   ├── auth  # client authorisation logic
│   ├── media  # logic of third-party media services
│   ├── root  # feature of combining user features, may also contain common logic, e.g. - database seed
│   └── user  # logic of interaction with a client of user type
├── cli.ts  # need to run the command
└── main.ts  # application entry point
```

### Auth feature structure
```
.
├── application
│   # Contains the application logic and use cases for authentication.
│   ├── auth-application.module.ts
│   # Module that configures and exports all application-level logic for auth.
│   ├── commands
│   # Contains command definitions and handlers for performing actions.
│   │   ├── index.ts
│   # Exports all command definitions and handlers.
│   │   ├── sign-in
│   # Contains command definitions and handlers for user sign-in.
│   │   │   ├── sign-in.command.ts
│   # Defines the sign-in command.
│   │   │   └── sign-in.handler.ts
│   # Handles the sign-in command logic.
│   │   ├── sign-out
│   # Contains command definitions and handlers for user sign-out.
│   │   │   ├── sign-out.command.ts
│   # Defines the sign-out command.
│   │   │   └── sign-out.handler.ts
│   # Handles the sign-out command logic.
│   │   └── update-tokens
│   # Contains command definitions and handlers for updating tokens.
│   │       ├── update-token.command.ts
│   # Defines the update tokens command.
│   │       └── update-token.handler.ts
│   # Handles the update tokens command logic.
│   └── query
│   # Contains query definitions and handlers for retrieving data.
│       ├── get-sessions
│   # Contains query definitions and handlers for retrieving user sessions.
│       │   ├── get-sessions.handler.ts
│   # Handles the get sessions query logic.
│       │   └── get-sessions.query.ts
│   # Defines the get sessions query.
│       └── index.ts
│   # Exports all query definitions and handlers.
├── auth.module.ts
│   # Main module for the authentication feature, orchestrates all sub-modules.
├── domain
│   # Contains the domain models, interfaces, and business logic.
│   ├── dto
│   # Contains data transfer objects used for transferring data.
│   │   ├── session.response.ts
│   # Data transfer object for a single session response.
│   │   ├── sessions.response.ts
│   # Data transfer object for multiple sessions response.
│   │   └── sign-in.dto.ts
│   # Data transfer object for sign-in requests.
│   ├── exceptions.ts
│   # Contains custom exceptions related to the authentication domain.
│   ├── models
│   # Contains the domain model definitions for authentication entities.
│   │   ├── session.model.ts
│   # Definition of the session domain model.
│   │   └── sessions.model.ts
│   # Definition of the sessions domain model.
│   └── ports
│   # Contains interfaces that define the contracts for domain services.
│       └── auth-database.repository.interface.ts
│   # Interface for accessing authentication data from a database.
└── infrastructure
    # Contains the implementation details for the infrastructure concerns (adapters, providers, etc.).
    ├── adapters
    # Contains adapters for external systems like HTTP and persistence.
    │   ├── http
    # Contains HTTP related logic for handling requests and responses.
    │   │   └── controllers
    # Contains controllers for exposing APIs.
    │   │       ├── auth.controller.ts
    # Controller for handling auth-related HTTP requests.
    │   │       └── index.ts
    # Exports all controllers.
    │   └── persistence
    # Contains persistence logic using repositories.
    │       └── auth-database.repository.ts
    # Implementation of the auth database repository.
    ├── auth-infrastructure.module.ts
    # Module to configure and export all infrastructure-level dependencies for auth.
    └── providers
    # Contains providers for dependency injection.
        ├── database.repository.provider.ts
    # Provides the database repository implementation to other modules.
        └── index.ts
    # Exports all providers.

```

<div style="font-family: sans-serif; line-height: 1.6;">
    <h2 style="border-bottom: 2px solid #ddd; padding-bottom: 0.5em; margin-bottom: 1em;">Technology stack</h2>
    <p>This project utilises the following technologies:</p>

<h3 style="margin-top: 1.5em; color: #333;">Backend</h3>
<ul style="list-style: none; padding-left: 0;">
    <li style="margin-bottom: 0.8em;">
        <a href="https://nestjs.com/" style="text-decoration: none; color: #333;">
            <img src="https://img.shields.io/badge/nestjs-%23E0234E.svg?style=for-the-badge&logo=nestjs&logoColor=white"
                 alt="NestJS" style="vertical-align: middle; margin-right: 0.5em;" />
            <span style="font-weight: bold;">NestJS</span>
        </a>
        <br>
        <span style="margin-left: 2.5em; display: block; color: #666;">A framework for building scalable server-side applications on Node.js..</span>
</li>

<li style="margin-bottom: 0.8em;">
        <a href="https://rxjs.dev/" style="text-decoration: none; color: #333;">
            <img
                src="https://img.shields.io/badge/rxjs-%23B7178C.svg?style=for-the-badge&logo=reactivex&logoColor=white"
                alt="RxJS" style="vertical-align: middle; margin-right: 0.5em;" />
            <span style="font-weight: bold;">RxJS</span>
        </a>
        <br>
        <span style="margin-left: 2.5em; display: block; color: #666;">A library for reactive programming with asynchronous data streams.</span>
</li>

<li style="margin-bottom: 0.8em;">
        <a href="https://graphql.org/" style="text-decoration: none; color: #333;">
            <img
                src="https://img.shields.io/badge/GraphQL-%23E10098.svg?style=for-the-badge&logo=graphql&logoColor=white"
                alt="GraphQL" style="vertical-align: middle; margin-right: 0.5em;" />
            <span style="font-weight: bold;">GraphQL</span>
        </a>
        <br>
        <span style="margin-left: 2.5em; display: block; color: #666;">A query language for your API that allows clients to request exactly what they need.</span>
</li>

<li style="margin-bottom: 0.8em;">
        <a href="https://www.prisma.io/" style="text-decoration: none; color: #333;">
            <img src="https://img.shields.io/badge/prisma-%233982CE.svg?style=for-the-badge&logo=prisma&logoColor=white"
                 alt="Prisma" style="vertical-align: middle; margin-right: 0.5em;" />
            <span style="font-weight: bold;">Prisma</span>
        </a>
        <br>
        <span style="margin-left: 2.5em; display: block; color: #666;">ORM (Object-Relational Mapper) for database access.</span>
</li>

<li style="margin-bottom: 0.8em;">
        <a href="https://swagger.io/" style="text-decoration: none; color: #333;">
            <img
                src="https://img.shields.io/badge/swagger-%23C6C6C6.svg?style=for-the-badge&logo=swagger&logoColor=black"
                alt="Swagger" style="vertical-align: middle; margin-right: 0.5em;" />
            <span style="font-weight: bold;">Swagger</span>
        </a>
        <br>
        <span
            style="margin-left: 2.5em; display: block; color: #666;">API description and documentation tool</span>
</li>
</ul>
</div>

## Good coding and happy day!🤘