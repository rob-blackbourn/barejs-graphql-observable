# @barejs/graphql-observable

This is a simple observable GraphQL client written specifically to support the
[bareASGI GraphQL middleware](https://bareasgi-graphql-next.readthedocs.io/en/latest/index.html#). It uses the [rxjs](https://rxjs-dev.firebaseapp.com/) 
observable library.

## Usage

### Subscriptions

The `graphqlSubscribe` function used be used for subscriptions.

```js
import { graphqlSubscribe } from '@barejs/graphql-observable'

const url = 'http://www.example.com/sse-subscription'
const query = 'subscription { someSubscription { someField someOtherField } }'
const variables = null
const operationName = null

subscription = graphqlSubscribe(url, query, variables, operationName).subscribe({
  next: data => console.log(data),
  error: error => console.error(error),
  complete: () => console.log('Completed')
})
```

### Queries, Mutations and Subscriptions

The `graphqlObserve` can be used for queries, mutations, and subscriptions.

```js
import { graphqlObserve } from '@barejs/graphql-observable'

const url = 'http://www.example.com/graphql'

// This could be a query, mutation or subscription.
const query = 'subscription { someSubscription { someField someOtherField } }'
const variables = null
const operationName = null

const subscription = graphqlObserve(
  url,
  query,
  variables,
  operationName)
  .subscribe({
    next: data => console.log(data),
    error: error => console.log(error),
    complete: () => console.log('complete')
  })

// Later ...
subscription.unsubscribe()
```