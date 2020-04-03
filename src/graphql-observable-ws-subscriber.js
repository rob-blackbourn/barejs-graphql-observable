import { Observable } from 'rxjs'
import { graphqlWsSubscriber } from '@barejs/graphql-client'

export default function graphqlObservableWsSubscriber (url, init, query, variables, operation) {
  return Observable.create(observer => {
    return graphqlWsSubscriber(
      url,
      init,
      query,
      variables,
      operation,
      observer.next,
      observer.error,
      observer.complete)
  })
}
