import { Observable } from 'rxjs'
import { graphqlStreamClient } from '@barejs/graphql-client'

export default function graphqlObservableStreamClient (url, query, variables, operation) {
  return Observable.create(observer => {
    return graphqlStreamClient(
      url,
      query,
      variables,
      operation,
      response => observer.next(response),
      error => observer.error(error),
      () => observer.complete()
    )
  })
}
