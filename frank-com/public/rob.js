function jsonp(url) {
    return new Promise((resolve,reject)=>{
        const random='frankJSONCallbackName'+Math.random()
        window[random]=(data)=>{
           resolve(data)
        }
        const script=document.createElement('script')
        script.src=`${url}?callback=${random}` //等下会去访问这个链接下的JS并执行
        
        script.onload=()=>{//当资源已加载完就会触发此函数
            script.remove() //在拿到了script的数据之后,就可以将它移除掉,避免后续很多个script累计到一起导致页面臃肿

        }
        script.onerror=()=>{
            reject()
        }
        document.body.appendChild(script)

    })
}
jsonp('http://qq.com:8888/friends.js').then(data=>{console.log(data)})


