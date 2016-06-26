!function(w){
    'use strict'

    var lstorage = window.localStorage
    
    function lsFile(url){
        this.url = url
        this.filename = url.substring(url.lastIndexOf("/")+1,url.lastIndexOf("."))
        //this.filename  = document.location.pathname
        this.lname     = 'Lsf_'+this.filename+'_'+url.substring(url.lastIndexOf("?")+1)
        this.filetext    = lstorage.getItem(this.lname)
        this.init()
    }

    lsFile.prototype.init = function(){
        if (this.filetext){
            this.eval(this.filetext)
        }else{
            this.xhr(this.url,this.runstr)
        }
    }

    lsFile.prototype.xhr = function(url,callback){
        var _this = this
        var version = url.substring(url.lastIndexOf("?"))
        var xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function(){
            switch(xhr.readyState){
                case 4:
                    if(xhr.status==200){
                        var filetext = xhr.responseText
                        if(callback){
                            callback.call(_this,filetext)
                        }
                    }else{
                        alert('加载失败')
                    }
                    break;
                default:
                    break;
            }
        }
        xhr.open('GET',url,false);
        xhr.send();
    }

    lsFile.prototype.runstr = function(filetext){
        this.eval(filetext)
        lstorage.setItem(this.lname,filetext);
        this.removels()
    }

    lsFile.prototype.removels = function(){
        var arr = []
        for(var i=0;i<lstorage.length;i++){
            var name = lstorage.key(i);
            if(name.indexOf(this.filename) > -1 && name != this.lname){
                arr.push(name)
            }
        }
        for(var i in arr){
            localStorage.removeItem(arr[i]);
        }
    }
    
    lsFile.prototype.eval = function(filetext){
        window.eval(filetext)
    }

    w.lsFile = function (url){
        return new lsFile(url)
    }
}(window)
