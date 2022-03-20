import { Observable } from 'rxjs'
import { graphqlEventSourceClient } from '@barejs/graphql-client'

export default function graphqlObservableEventSourceClient<T>(
  url: RequestInfo,
  init: RequestInit,
  query: string,
  variables: object,
  operationName: string | null
): Observable<T> {
  return new Observable(subscriber => {
    return graphqlEventSourceClient(
      url,
      init,
      query,
      variables,
      operationName,
      response => subscriber.next(response),
      error => subscriber.error(error),
      () => subscriber.complete()
    )
  })
}
