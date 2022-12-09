
function createHtml(data){
    return HtmlPart().start +createView(data)+HtmlPart().end;
}

function createView(data){
    var innerhtml =``;
    for (var obj in data){
  
      if (typeof data[obj] === 'object'){
        innerhtml = innerhtml +
                    HtmlPart().innerhtmlStart +
                    HtmlPart().panelViewStart +
                    HtmlPart().panelViewhead +
                    `<h3 align="center">${obj}</h3>`+
                    HtmlPart().panelViewheadEnd +
                    HtmlPart().panelBodyStart +
                    createListView(data[obj],obj)+
                    HtmlPart().panelBodyEnd +
                    HtmlPart().panelViewEnd +
                    HtmlPart().innerhtmlEnd;
  
                    //console.log("html--------",createListView(data[obj]));
              }
  
    }
  
    return HtmlPart().tophtmlStart + innerhtml + HtmlPart().tophtmlEnd;
  }
  
  
  //recursion function for inner key value pair....
  function createListView(data,key){
  
    var list=``;
    for(var obj in data){
      if(typeof data[obj] === 'object'){
        list = list + `<li class="list-group-item">` +HtmlPart().panelViewStart +
                  HtmlPart().panelViewhead +
                    `<h4 align="center">${key}-${obj}</h4>` +
                      HtmlPart().panelViewheadEnd +
                        HtmlPart().panelBodyStart +
                          createListView(data[obj],obj) +
                            HtmlPart().panelBodyEnd+
                              HtmlPart().panelViewEnd +`</li>`;
  
      }
  
       else if(typeof data[obj] === 'string' || typeof data[obj] === 'number'){
         if(data[obj]){
           list = list +`<li class="list-group-item"><b>${obj}</b> : ${data[obj]}</li>`;
         }
        }
  
    }
    if(!list){
      return "";
    }
    return HtmlPart().htmllistStart + list + HtmlPart().htmlListEnd;
  }
  
  //return basic html tag.......
  function HtmlPart(){
    var obj = {
      tophtmlStart:'<div class="container"><div class="row">',
      tophtmlEnd :'</div></div>',
      innerhtmlStart:'<div class="col-md-6">',
      panelViewStart:'<div class="panel panel-default">',
      panelViewhead:'<div class="panel-heading">',
      panelViewheadEnd : '</div>',
      panelBodyStart:'<div class="panel-body">',
      panelBodyEnd:'</div>',
      panelViewEnd:'</div>',
      innerhtmlEnd:'</div>',
      htmllistStart:'<ul class="list-group">',
      htmlListEnd:'</ul>',
      start:`<!doctype html>
              <html>
              <head>
                  <!-- META -->
                  <meta charset="utf-8">
                  <meta name="viewport" content="width=device-width, initial-scale=1"><!-- Optimize mobile viewport -->
  
                  <title>Node Server</title>
  
                  <!-- SCROLLS -->
                  <link rel="stylesheet" href="//netdna.bootstrapcdn.com/bootstrap/3.0.0/css/bootstrap.min.css"><!-- load bootstrap -->
                  <style>
                      html{ overflow-y:scroll; }
                      body{ padding-top:50px;
                            font-family: Nunito,Helvetica Neue,Helvetica,Arial,sans-serif;
                          }
                          .list-group-item{
                            border:none;
                          }
                          .jumbotron{
                            background-color:#008394;
                            color:#eeeeee;
                          }
                          .panel-default > .panel-heading {
                            background-color: #00a152;
                            color:#eeeeee;
                          }
                  </style>
                </head>
                <body>
                  <div class="container">
                      <div class="jumbotron text-center">
                        <h1>Server Static Info</h1>
                      </div>
                    </div>`,
  
        end:"</div></body></html>"
      }
      return obj;
  }
  


  
module.exports={
    createHtml
}