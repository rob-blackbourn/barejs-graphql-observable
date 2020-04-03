import { Observable } from 'rxjs'
import { graphqlFetchClient } from '@barejs/graphql-client'

export default function graphqlObservableFetchClient (url, init, query, variables, operationName) {
  return Observable.create(observer => {
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
      error => observer.error(error),
      response => {
        observer.next(response)
        observer.complete()
      })

    return () => abortController.abort()
  })
}
