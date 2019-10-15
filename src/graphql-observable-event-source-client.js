import { Observable } from 'rxjs'
import { graphqlEventSourceClient } from '@barejs/graphql-client'

export default function graphqlObservableEventSourceClient (url, query, variables, operationName, onNext, onError, onComplete) {
  return Observable.create(observer => {
    return graphqlEventSourceClient(
      url,
      query,
      variables,
      operationName,
      response => observer.next(response),
      error => observer.error(error),
      () => observer.complete()
    )
  })
}
