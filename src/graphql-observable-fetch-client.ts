import { Observable } from 'rxjs'
import { graphqlFetchClient } from '@barejs/graphql-client'

export default function graphqlObservableFetchClient<T>(
  url: RequestInfo,
  init: RequestInit,
  query: string,
  variables: object,
  operationName: string | null
): Observable<T> {
  return new Observable(subscriber => {
    return graphqlFetchClient(
      url,
      init,
      query,
      variables,
      operationName,
      error => subscriber.error(error),
      response => {
        subscriber.next(response)
        subscriber.complete()
      }
    )
  })
}
