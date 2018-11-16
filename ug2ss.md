
# The ultimate guide to Schema Stitching in GraphQL

An example-driven guide for understanding schema stitching in order to customize existing GraphQL API(s)

## TL;DR

Schema stitching is the process of creating a single GraphQL schema from multiple underlying GraphQL APIs.

This is an example-driven blog post that covers the following schema-stitching use cases:

* [A basic setup for schema stitching that simply delegates](#a473) ([*github](https://github.com/hasura/schema-stitching-examples/tree/master/basic-setup)*)

* [Merging two remote schemas ](#d677)([*github](https://github.com/hasura/schema-stitching-examples/tree/master/multiple-remote-graphql-apis)*)

* [Custom resolvers: Adding new queries and mutations to an existing remote schema](#e8ba) ([*github](https://github.com/hasura/schema-stitching-examples/tree/master/new-queries-mutations)*)

* [Override existing queries and mutations of a remote schema](#0e66) ([*github](https://github.com/hasura/schema-stitching-examples/tree/master/override-existing-queries-custom-check)*)

* [Schema transform: renaming root, root-fields and fields of a remote schema](#0f33) ([*github](https://github.com/hasura/schema-stitching-examples/tree/master/schema-transform)*)

* [Extend a remote schema with custom types](#2988) ([*github](https://github.com/hasura/schema-stitching-examples/tree/master/schema-extension)*)

## Introduction

Schema stitching is the process of creating a single GraphQL schema from multiple underlying GraphQL APIs.

Shout-out to Apollo and their library [graphql-tools](https://github.com/apollographql/graphql-tools) for their implementation and hopefully we’ll see more examples in other languages soon!

![](https://cdn-images-1.medium.com/max/2160/1*_KqIWctCiD9sJ7BUuHF3vQ.png)

Schema stitching can also be used to customise an existing GraphQL API. For example:

* You want to extend the schema of an existing GraphQL API by adding more fields to an existing type whose data comes from another data source

* You want to rename the root fields and types of a GraphQL API, for example if you want to change “snake_casing” to “CamelCase”

* You want to add custom resolvers or override existing resolvers of a GraphQL service such as Hasura GraphQL Engine.

### graphql-tools

Before we get to the tutorials, let us look at some of the important functions and the APIs that graphql-tools provides for schema stitching.

The following functions help us create a new schema from existing schemas, typedefs and resolvers.

* makeExecutableSchema: a function that takes type definitions and resolvers and instantiates a GraphQLSchema class. You can now run GraphQL queries against this object.

    const schema1 = makeExecutableSchema({
      typeDefs: `type Query { hello: String }`,
      resolvers: { Query: () => return ["hello": "world"] }
    });

* introspectSchema: an async function that returns a GraphQLSchema instance of a remote GraphQL service. It takes an instance of [Apollo-Link](https://github.com/apollographql/apollo-link) with the uri of a GraphQL server, optional headers to be able to introspect the schema.

    const introspectionResult = await introspectSchema(
      new HttpLink({ uri: 'https://api.graphql.com/graphql' })
    );

* makeRemoteExecutableSchema: a function that gives you a the schema of a remote GraphQL server and an instance of [Apollo-Link](https://github.com/apollographql/apollo-link) with its uri; returns a remote schema that can be delegated to

    const schema2 = await makeRemoteExecutableSchema({
      schema: introspectionResult,
      link: new HttpLink({ uri: 'https://api.graphql.com/graphql' })
    });

* mergeSchemas: a function that takes multiple executable schemas along with custom typedefs & resolvers you can define, to create a newly combined GraphQL schema

    const schema3 = mergeSchemas({
      schemas: [
        schema1,
        schema2,
        someTypeExtensions
      ],
      resolvers: customResolvers
    });

![Major use cases of mergeSchemas()](https://cdn-images-1.medium.com/max/2286/1*_wyu7tkL2mMw-SliUYGTxg.png)*Major use cases of mergeSchemas()*

Each section below is an independent tutorial that you can clone and run. Github links are available at the bottom of each section. We will use Hasura GraphQL Engine API for all our examples.

If you are looking for a boilerplate to get started with schema stitching, [here is one](https://github.com/hasura/schema-stitching-examples/tree/master/basic-setup).

## Stitching multiple remote GraphQL APIs

One of the major advantages of using GraphQL is to have a single endpoint for all the APIs. We lose this advantage if our client wants to query different GraphQL servers. Schema stitching helps us solve this by giving us the ability to expose multiple GraphQL APIs over a single endpoint.

Lets consider a real world use case, say, your client is querying two GraphQL APIs

* https://bazookaand.herokuapp.com/v1alpha1/graphql

* https://schema-stitching-blog.herokuapp.com/v1alpha1/graphql

Let us try to expose these two APIs over a single endpoint using schema stitching. The algorithm to stitch multiple GraphQL APIs is as follows:

1. List down your GraphQL APIs and their HTTP endpoint parameters:

<iframe src="https://medium.com/media/a25dd443b4ec02de2e6ea03407f80915" frameborder=0></iframe>

2. Create executable schemas from the remote GraphQL APIs using the makeRemoteExecutableSchema() function and HttpLink :

<iframe src="https://medium.com/media/7373b6b2adf71f711b5ff9d642781461" frameborder=0></iframe>

3. Merge all the remote schemas using mergeSchemas():

<iframe src="https://medium.com/media/e917c683ed0f7de555e2af5a3320c64c" frameborder=0></iframe>

4. Serve this schema:

<iframe src="https://medium.com/media/5b9c0aba4dc2bc5f43ce7d586395e02f" frameborder=0></iframe>

[Check out this example on Github.](https://github.com/hasura/schema-stitching-examples/tree/master/multiple-remote-graphql-apis)

Sometimes, the two remote GraphQL APIs might have similar types or root fields and thus cannot be merged. In such cases, you have to rename fields and types of one or both the GraphQL APIs. Check out [Renaming root fields and resolvers](#0f33) section below.

## New Queries and Mutation

Sometimes you want to add some new queries and mutations on top of your existing GraphQL API. Some of the major use cases are:

1. You are using a GraphQL layer your database such as Hasura GraphQL Engine and you want to expose a custom query that the GraphQL layer does not support.

1. You want to expose a make_payment field in your e-commerce app.

1. You want to expose an existing REST API with some custom logic.

Consider that you have a user table exposed via the Hasura GraphQL Engine.

    user (
      id serial primary key,
      name text,
      age int,
      city text,
      email text
    )

GraphQL Engine currently does not support aggregations over tables. Let us expose a field user_age_average that fetches the average age using custom SQL. We will use knex for connecting to Postgres.

The newly “stitched” GraphQL API will have:

* All the queries and mutations from the user schema.

* An additional root field called user_age_average that gets the average age of users

To achieve the above, the algorithm is as follows:

1. Instantiate a knex client for postgres:

<iframe src="https://medium.com/media/e0562e9bc49c1d94df52b6a928e83ab0" frameborder=0></iframe>

We will be setting this knex client in the server context so that it is passed to all the resolvers.

    const server = new ApolloServer({
      schema,
      knex: createNex()
    });

2. Write the type definitions and resolvers for the user_average_age schema:

<iframe src="https://medium.com/media/dee945b24054936dcbcfe0b492b8702c" frameborder=0></iframe>

3. Make an executable GraphQL schema out of the above type definitions and resolvers:

    const averageAgeSchema = makeExecutableSchema({
      typeDefs,
      resolvers
    });

4. Create a remote executable schema from the the existing user API using the makeRemoteExecutableSchema() function:

<iframe src="https://medium.com/media/fbcefb27740bc191571c05cd9eadc0d2" frameborder=0></iframe>

5. Finally merge the two schemas:

<iframe src="https://medium.com/media/adacb9e756987793ee76bef77bd4a3c3" frameborder=0></iframe>

6. Serve the newly created schema. Make sure to set the knex client in the context while creating a server instance.

<iframe src="https://medium.com/media/ff73b547e909e7ec939188d2f998b6af" frameborder=0></iframe>

[Check out this example on Github.](https://github.com/hasura/schema-stitching-examples/tree/master/new-queries-mutations)

## Overriding existing queries and mutations

While tailoring a new schema from existing GraphQL schemas using schema stitching, we can also override the existing queries and mutations. This is particularly useful when:

* Adding custom validation to the resolvers

* Data clean-up and case transformation

### Adding custom checks

Let us consider a gaming room GraphQL API that serves the following schema.

    # root
    type Query {
      game: game
    }

    type game {
      id: Int,
      name: String,
      type: String,
      multiplayer: Boolean,
      ip: String
    }

We will now add a custom validation to the game query such that this query passes through only after 17:00 (so that kids don’t game during the day ;-)).

1. Create a remote executable schema from the the existing game API.

<iframe src="https://medium.com/media/68751c96962aa2b9165543a4b3f7a0c6" frameborder=0></iframe>

2. Write a custom resolver to add custom validation to the game query.

<iframe src="https://medium.com/media/f3dfcb11929b7310c75c2da40f237e03" frameborder=0></iframe>

3. Merge the executable game schema with our custom resolvers:

<iframe src="https://medium.com/media/5e97e59bcbbe1bbb2d3d7d0b2cec0b3e" frameborder=0></iframe>

4. Serve the new schema:

<iframe src="https://medium.com/media/5b9c0aba4dc2bc5f43ce7d586395e02f" frameborder=0></iframe>

[Check out this example on Github.](https://github.com/hasura/schema-stitching-examples/tree/master/override-existing-queries-custom-check)

### Data cleanup

We might want to sanitize or modify some data in our GraphQL server before we delegate it to some underlying GraphQL API. This can be achieved with the help of a custom resolver as illustrated below.

Let us consider a simple userprofile schema where the insert_user mutation has to be delegated to an underlying schema. Before delegating, the email in the data has to be converted to lowercase.

The algorithm is as follows:

1. Create a remote executable schema with the makeRemoteExecutableSchema() function:

<iframe src="https://medium.com/media/c8a7afb00c5ff34cc0fe3bd5dfaa0259" frameborder=0></iframe>

2. Create a custom resolver for converting the email to lowercase.

<iframe src="https://medium.com/media/d51db3716a8c3a66847d569582d60da4" frameborder=0></iframe>

3. Merge the executable schema with the resolver using the mergeSchemas function:

<iframe src="https://medium.com/media/7eec5e74362e68b25c14c49362c8e6c5" frameborder=0></iframe>

4. Serve the merged schema with a new instance of the apollo-server:

<iframe src="https://medium.com/media/8903ed982769ad9b695ba05b88321e8a" frameborder=0></iframe>

[Try out this example on this Github.](https://github.com/hasura/schema-stitching-examples/tree/master/override-existing-queries-data-cleanup)

## Renaming types and root fields

Sometimes you might want to prefix, suffix or camelize the names of the root fields or types of a remote GraphQL API. This could be useful while stitching remote schemas that have conflicting root fields or types.

In this example, we will rename the root fields and types of the Github API in our server. The algorithm is as follows:

1. Create an executable schema out of the Github API and rename the root fields and types.

<iframe src="https://medium.com/media/505a3f86e4da3454b5c4047ee95a948f" frameborder=0></iframe>

2. Serve the newly created schema

<iframe src="https://medium.com/media/5b9c0aba4dc2bc5f43ce7d586395e02f" frameborder=0></iframe>

[Check out this example on Github.](https://github.com/hasura/schema-stitching-examples/tree/master/schema-transform)

### Renaming root to Query, Mutation, Subscription

The GraphQL spec allows you to have custom names for the root of your GraphQL schema. However, some libraries expect the roots to be Query, Mutation and Subscription . If you want to rename the roots of a GraphQL API to Query. Mutation and Subscription, you can simply make an executable schema out of your GraphQL API and pass it through mergeSchemas. mergeSchemas uses Query. Mutation and Subscription as roots.

## Schema Extension

Schema extension is the process of extending your existing GraphQL schema with custom fields.

Let us consider a user schema (Running at https://bazookaand.herokuapp.com/v1alpha1/graphql).

    type Query {
      user: user
    }

    type user {
      id: Int,
      name: String,
      age: Int,
      city: String,
      email: String
    }

Now we want to extend the type user such that we can also get the weather of user’s city. This weather will come from the [metaweather REST API](https://www.metaweather.com/).

The new user schema should be:

    type Query {
      user: user
    }

    type user {
      id: Int,
      name: String,
      age: Int,
      city: String,
      city_weather: city_weather
      email: String
    }

    type city_weather {
      temp,
      max_temp,
      min_temp
    }

The algorithm is as follows:

1. Create a remote executable schema out of the existing user GraphQL API:

<iframe src="https://medium.com/media/30a7c3676341f36984dbac799aa520f9" frameborder=0></iframe>

2. Write custom logic to get the weather of a city

<iframe src="https://medium.com/media/12b6d4cbd93a3239984bdeefe893ee95" frameborder=0></iframe>

3. Extend the type user of the existing GraphQL API with a field city_weather of type city_weather .

<iframe src="https://medium.com/media/fbb837988108760466ea01858b00304d" frameborder=0></iframe>

4. Write a resolver for field city_weather that gets the weather of the city:

<iframe src="https://medium.com/media/60a0bd503ddc55c717c2ee554ae62733" frameborder=0></iframe>

5. Merge the new type extensions and extension resolvers with the existing user schema using mergeSchemas() function:

<iframe src="https://medium.com/media/029efb18ca0f1facf085a209c87c5862" frameborder=0></iframe>

6. Finally serve this new schema:

<iframe src="https://medium.com/media/5849087bc3b03f65adbee792d33c9719" frameborder=0></iframe>

[Check out this example on Github.](https://github.com/hasura/schema-stitching-examples/tree/master/schema-extension)

If you have any questions or if you think that anything is handled wrongly, please share in comments or [open an issue here](https://github.com/hasura/schema-stitching-examples/issues/new).

[***Hasura](https://goo.gl/fR68ep)** gives you instant realtime GraphQL APIs over any Postgres database without having to write any backend code.*

*For those of you who are new to the Hasura GraphQL engine, [**this](https://docs.hasura.io/1.0/graphql/manual/index.html)** is a good place to get started.*

<iframe src="https://medium.com/media/a35dca58abcfd3474889e3463e074566" frameborder=0></iframe>
