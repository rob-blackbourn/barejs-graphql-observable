import { Observable } from 'rxjs'
import { graphqlFetchClient } from '@barejs/graphql-client'

export default function graphqlObservableFetchClient (url, init, query, variables, operationName) {
  return new Observable(subscriber => {
    const abortController = new AbortController()

    graphqlFetchClient(
      url,
      {
        signal: abortController.signal,
        ...init
      },
      query,
      variables,
      operationName,
      error => subscriber.error(error),
      response => {
        subscriber.next(response)
        subscriber.complete()
      })

    return () => abortController.abort()
  })
}
