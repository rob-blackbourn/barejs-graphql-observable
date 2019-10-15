import { Observable } from 'rxjs'
import { graphqlWsClient } from '@barejs/graphql-client'

export default function graphqlObservableWsClient (url, query, variables, operationName, onNext, onError, onComplete) {
  return Observable.create(observer => {
    return graphqlWsClient(
      url,
      query,
      variables,
      operationName,
      response => observer.next(response),
      error => observer.error(error),
      () => observer.complete())
  })
}
