## FetchQueue

### Js library to process multiple ajax requests in a sequential order


### Usage

#### Creating FetchQueue with some delay in milliseconds

```
    const fetchQueue = new FetchQueue(delayInMilliseconds)
```

#### Adding request in fetchQueue supplying parameters for url ,success callback and error callback

```
    fetchQueue.addRequest(url,successCb,errorCb,headers,resType)
```
