# @barejs/graphql-observable

This is a simple observable GraphQL client written specifically to support the
[bareASGI GraphQL middleware](https://bareasgi-graphql-next.readthedocs.io/en/latest/index.html#). It uses the [rxjs](https://rxjs-dev.firebaseapp.com/) 
observable library.

## Usage

### Subscriptions

The `graphqlObservableWsSubscriber` function used be used for subscriptions.

```js
import { graphqlObservableWsSubscriber } from '@barejs/graphql-observable'

const url = 'http://www.example.com/subscriptions'
const query = 'subscription { someSubscription { someField someOtherField } }'
const variables = null
const operationName = null

subscription = graphqlObservableWsSubscriber(url, query, variables, operationName).subscribe({
  next: data => console.log(data),
  error: error => console.error(error),
  complete: () => console.log('Completed')
})
```

### Queries, Mutations and Subscriptions

The `graphqlObservableWsClient` can be used for queries, mutations, and subscriptions.

```js
import { graphqlObservableWsClient } from '@barejs/graphql-observable'

const url = 'http://www.example.com/graphql'

// This could be a query, mutation or subscription.
const query = 'subscription { someSubscription { someField someOtherField } }'
const variables = null
const operationName = null

const subscription = graphqlObservableWsClient(
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

### Other transports

In addition to the fetch/WebSocket transports there is support for `EventSource` and streaming fetch, although these are only supported by the bareASGI web framework.

The following functions are available:

*  graphqlObservableEventSourceClient,
*  graphqlObservableEventSourceSubscriber,
*  graphqlObservableFetchClient,
*  graphqlObservableStreamClient,
*  graphqlObservableWsClient,
*  graphqlObservableWsSubscriber

All of the clients abd subscribers take the same arguments as the WebSocket variant.
