## Apollo cache before mutation:

```js
{
    authors: [
        {
            id: 1,
            name: "Tanmai"
            articles: [
                {
                    id: 1,
                    title: "Title 1",
                    __typename: "article"
                },
                {
                    id: 2,
                    title: "Title 2",
                    __typename: "article"
                }
            ]
            __typename: 'author'
        },
        {
            id: 2,
            name: "Rishi",
            articles: [
                {
                    id: 3,
                    title: "Title 3",
                    __typename: "article"
                },
                {
                    id: 4,
                    title: "Title 3",
                    __typename: "article"
                }
            ]
            __typename: 'author'
        }
    ]
}
```

Lets analyze the effect of the following indpendent mutations on Apollo Cache:
1. Update authors mutation
2. Delete authors mutation

## Update Mutation

Mutation:

```gql
mutation {
    update_authors (
        disconnect: {
            articles
        }
        where: {
            _and: [
                id: {
                    _eq: 1
                },
                articles: {
                    id: {
                        _eq: 1
                    }
                }
            ]
        }
    ) {
        returning {
            authors {
                id
                name
                articles {
                    id
                    title
                }
            }
        }
    }
}
```

Mutation Response:

```js
{
    returning: {
        authors: [
            {
                id: 1,
                name: "Tanmai"
                articles: [
                    {
                        id: 1,
                        title: "Title 1",
                        __typename: "article"
                    }
                ]
                __typename: 'author'
            },
            {
                id: 2,
                name: "Rishi",
                articles: [
                    {
                        id: 3,
                        title: "Title 3",
                        __typename: "article"
                    },
                    {
                        id: 4,
                        title: "Title 3",
                        __typename: "article"
                    }
                ]
                __typename: 'author'
            }
        ]
    }
}
```

Now Apollo cache looks at the mutation response:

1. It looks at first element, `id = 1`, `__typename= author`. Looks in the cache if there's anything like that
2. Finds out that there is an item like that in the cache.
3. Sees that there's an article missing under the `articles` field.
4. Updates the cache by removing the extra article
5. It looks at the second element, `id = 2`, `__typename=author`. Looks in the cache if there's anything like that
6. Finds out that there is.
7. Sees that the data is exactly same as it is in the cache.
8. Does nothing
9. And so on


# Delete Mutation

```gql
mutation {
    delete_authors (
        where: {
            id: 2
        }
    ){
        returning {
            authors {
                id
                title
            }
        }
    }
}
```

Mutation Response:

```js
{
    returning: {
        authors: [
            {
                id: 1,
                name: "Tanmai"
                articles: [
                    {
                        id: 1,
                        title: "Title 1",
                        __typename: "article"
                    },
                    {
                        id: 2,
                        title: "Title 2",
                        __typename: "article"
                    }
                ]
                __typename: 'author'
            }
    }
}
```

Now Apollo cache looks at the mutation response:

1. It looks at first element, `id = 1`, `__typename= author`. Looks in the cache if there's anything like that
2. Finds out that there is an item like that in the cache.
3. Sees that the data is exactly same as it is in the cache.
4. Done.