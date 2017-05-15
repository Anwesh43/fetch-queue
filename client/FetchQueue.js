class FetchQueue {
    constructor() {
        this.requestQueue = []
    }
    addRequest(url,successCb,errorCb,headers,resType {
        const request = new Request(url,successCb,errorCb,headers,resType)
        this.requestQueue.push(request)
        if(this.requestQueue.length == 1) {
            processAllRequests()
        }
    }
    processAllRequests() {
      
    }
}
class Request {
    constructor(url,successCb,errorCb,headers,resType) {
        this.url = url
        this.successCb = successCb
        this.errorCb = errorCb
        this.headers = headers
        this.resType = resType
    }
    process(cb) {
        fetch(this.url,{headers:this.headers}).then((res)=>{
            let resPromise = res.text()
            if(this.resType == 'json') {
                resPromise = res.json()
            }
            retrun resPromise
        }).then((result)=>{
            this.successCb(result)
            cb()
        }).catch((err)=>{
            this.errorCb(err)
            cb()
        })
    }
}
