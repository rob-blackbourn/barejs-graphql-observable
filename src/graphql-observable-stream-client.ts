import { Observable } from 'rxjs'
import { graphqlStreamClient } from '@barejs/graphql-client'

export default function graphqlObservableStreamClient<T>(
  url: RequestInfo,
  init: RequestInit,
  query: string,
  variables: object,
  operation: string | null
): Observable<T> {
  return new Observable(subscriber => {
    return graphqlStreamClient(
      url,
      init,
      query,
      variables,
      operation,
      response => subscriber.next(response),
      error => subscriber.error(error),
      () => subscriber.complete()
    )
  })
}
