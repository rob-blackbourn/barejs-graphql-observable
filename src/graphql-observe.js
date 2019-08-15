import { Observable } from 'rxjs'
import FetchError from './fetch-error'

export default function graphqlObservable (url, query, variables, operationName) {
  return Observable.create(observer => {
    const abortController = new AbortController()

    fetch(url, {
      method: 'POST',
      signal: abortController.signal,
      body: JSON.stringify({
        query,
        variables,
        operationName
      })
    })
      .then(response => {
        if (response.status === 200) {
          // The response is from a query or mutation.
          response.json()
            .then(json => {
              observer.next(json)
              observer.complete()
            })
            .catch(error => observer.error(error))
        } else if (response.status === 201) {
          // The response is from a subscription.
          const location = response.headers.get('location')
          const eventSource = new EventSource(location)
          eventSource.onmessage = event => observer.next(JSON.parse(event.data))
          eventSource.onerror = error => observer.error(error)
          abortController.signal.onabort = () => {
            if (eventSource.readyState !== 2) {
              eventSource.close()
            }
          }
        } else {
          observer.error(new FetchError(response, 'Failed to execute GraphQL'))
        }
      })
      .catch(error => observer.error(error))

    return () => abortController.abort()
  })
}
