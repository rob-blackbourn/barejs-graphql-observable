import { Observable } from 'rxjs'
import { graphqlEventSourceSubscriber } from '@barejs/graphql-client'

export default function graphqlObservableEventSourceSubscriber<T>(
  url: string | URL,
  init: EventSourceInit,
  query: string,
  variables: object,
  operationName: string | null
): Observable<T> {
  return new Observable<any>(subscriber => {
    return graphqlEventSourceSubscriber(
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
