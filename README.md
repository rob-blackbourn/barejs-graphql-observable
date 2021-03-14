# @barejs/graphql-observable

This is a collection of observable GraphQL clients which support queries, mutations and subscriptions.
It uses the
[rxjs](https://rxjs-dev.firebaseapp.com/) 
observable library.

It specifically targets the 
[bareASGI GraphQL](https://github.com/rob-blackbourn/bareASGI-graphql-next)
module from the
[bareASGI](https://github.com/rob-blackbourn/bareASGI)
python web framework, which provides multiple transports for subscriptions.

Thi is a thin wrapper around
[@barejs/graphql-client](https://github.com/rob-blackbourn/barejs-graphql-client)
where more documentation can be found.

## Usage

### Subscriptions

The `graphqlObservableWsSubscriber` function used be used for subscriptions.

```js
import { graphqlObservableWsSubscriber } from '@barejs/graphql-observable'

const url = 'http://www.example.com/subscriptions'
const init = {}

const query = 'subscription { someSubscription { someField someOtherField } }'
const variables = null
const operationName = null

subscription = graphqlObservableWsSubscriber(url, init, query, variables, operationName).subscribe({
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
const init = {}

// This could be a query, mutation or subscription.
const query = 'subscription { someSubscription { someField someOtherField } }'
const variables = null
const operationName = null

const subscription = graphqlObservableWsClient(
  url,
  init,
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
