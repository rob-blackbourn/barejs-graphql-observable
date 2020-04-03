import { Observable } from 'rxjs'
import { graphqlEventSourceSubscriber } from '@barejs/graphql-client'

export default function graphqlObservableEventSourceSubscriber (url, init, query, variables, operationName) {
  return Observable.create(observer => {
    return graphqlEventSourceSubscriber(
      url,
      init,
      query,
      variables,
      operationName,
      response => observer.next(response),
      error => observer.error(error),
      () => observer.complete())
  })
}
