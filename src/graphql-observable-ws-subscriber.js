import { Observable } from 'rxjs'
import { graphqlWsSubscriber } from '@barejs/graphql-client'

export default function graphqlObservableWsSubscriber (url, query, variables, operation) {
  return Observable.create(observer => {
    return graphqlWsSubscriber(
      url,
      query,
      variables,
      operation,
      observer.next,
      observer.error,
      observer.complete)
  })
}
