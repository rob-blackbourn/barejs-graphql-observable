import { Observable } from 'rxjs'
import { graphqlFetchClient } from '@barejs/graphql-client'

export default function graphqlObservableFetchClient (url, init, query, variables, operationName) {
  return Observable.create(observer => {
    const abortController = new AbortController()

    const init = {
      signal: abortController.signal
    }

    graphqlFetchClient(
      url,
      init,
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
