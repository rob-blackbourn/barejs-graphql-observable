import { Observable } from 'rxjs'
import { graphqlWsClient } from '@barejs/graphql-client'

export default function graphqlObservableWsClient (url, init, query, variables, operationName, onNext, onError, onComplete) {
  return Observable.create(observer => {
    return graphqlWsClient(
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
