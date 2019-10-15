import { Observable } from 'rxjs'
import { graphqlEventSourceSubscriber } from '@barejs/graphql-client'

export default function graphqlObservableEventSourceSubscriber (url, query, variables, operationName) {
  return Observable.create(observer => {
    return graphqlEventSourceSubscriber(
      url,
      query,
      variables,
      operationName,
      response => observer.next(response),
      error => observer.error(error),
      () => observer.complete())
  })
}
