import { Observable } from 'rxjs'
import { graphqlWsSubscriber } from '@barejs/graphql-client'

export default function graphqlObservableWsSubscriber<T>(
  url: string | URL,
  query: string,
  variables: object,
  operation: string | null
): Observable<T> {
  return new Observable(subscriber => {
    return graphqlWsSubscriber(
      url,
      query,
      variables,
      operation,
      subscriber.next,
      subscriber.error,
      subscriber.complete
    )
  })
}
