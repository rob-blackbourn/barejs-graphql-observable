import { Observable } from 'rxjs'

export default function graphqlSubscribe (url, query, variables, operationName) {
  return Observable.create(observer => {
    const abortController = new AbortController()

    let subscriptionUrl = url + '?query=' + encodeURIComponent(query)
    if (variables) {
      subscriptionUrl += '&variables=' + encodeURIComponent(JSON.stringify(variables))
    }
    if (operationName) {
      subscriptionUrl += '&operationName=' + encodeURIComponent(operationName)
    }

    const eventSource = new EventSource(subscriptionUrl)

    eventSource.onmessage = event => observer.next(JSON.parse(event.data))
    eventSource.onerror = error => observer.error(error)
    abortController.signal.onabort = () => {
      if (eventSource.readyState !== 2) {
        eventSource.close()
      }
    }

    return () => abortController.abort()
  })
}
