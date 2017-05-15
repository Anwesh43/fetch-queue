class FetchQueue {
    constructor(delay) {
        this.requestQueue = []
        this.delay = delay||500
    }
    addRequest(url,successCb,errorCb,headers,resType) {
        const request = new Request(url,successCb,errorCb,headers,resType)
        this.requestQueue.push(request)
        if(this.requestQueue.length == 1) {
            this.processAllRequests()
        }
    }
    processAllRequests() {
        const currRequest = this.requestQueue[0]
        currRequest.process(()=>{
            this.requestQueue.splice(0,1)
            if(this.requestQueue.length != 0) {
                setTimeout(()=>{
                    this.processAllRequests()
                },this.delay)

            }
        })
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
            if(this.resType == 'json') {
                return res.json()
            }
            return res.text()
        }).then((result)=>{
            this.successCb(result)
            cb()
        }).catch((err)=>{
            this.errorCb(err)
            cb()
        })
    }
}
