define([
    'dojo/_base/declare',
    'dijit/_WidgetBase',
    'dojo/topic',
    'dojo/_base/array',
    'dojo/_base/lang',
    "dijit/registry", 
    'dojo/io-query'

], function (
    declare,
    _WidgetBase,
    topic,
    array,
    lang,
    registry,
    ioQuery
) {
    return declare([_WidgetBase], {
        urlParamName: 'opentable', //this is parameter name to be used in a url.    
        urlParams: [],
        currentParam: {},
        postCreate: function () {
            this.waitforTableWidget();
        },
        checkURLParams: function () {
            var uri = window.location.href;
            var qs =  null;
            var decodedqs = null;
            var qsObj = null;
            var openTableArray = null;            
            if (uri.indexOf('?') > -1) {
                qs = uri.substring(uri.indexOf('?') + 1, uri.length);
                if (qs.length > 0 ) {
                    decodedqs = this.fullyDecodeURI(qs);
                    qsObj = ioQuery.queryToObject(decodedqs);
                    openTableArray = qsObj[this.urlParamName] || '';
                    //current url needs to have 3 parameters in the order of tablename, fieldname, search value
                    if (openTableArray.length === 3) {
                        //loop through the url parameters and match the tablename (index 0) to the config table name
                        array.forEach(this.urlParams, function (params, index) {
                            if (openTableArray[0] === params.tablename) {
                                this.currentParam = params;
                                this.openTablefromParams(openTableArray[1], openTableArray[2] )                          
                            }
                        }, this);                 
                    }                
                }                
            }
        },  
        isEncoded: function (uri) {
            uri = uri || '';
            return uri !== decodeURIComponent(uri);
        },
        fullyDecodeURI: function (uri) {
            while (this.isEncoded(uri)) {
                uri = decodeURIComponent(uri);
            } 
            return uri;
        },
        openTablefromParams: function(fieldname, value) {
            topic.publish('attributesContainer/addTable', {
                title: this.currentParam.tablename,
                topicID: 'openTable_fromURLParms',  
                id: 'openTable_fromURLParms', 
                closable: true,
                confirmClose: true, 
                symbolOptions: {
                    features: {
                         point: {
                            type: 'esriSMS',
                            style: 'esriSMSCircle',
                            size: 10,
                            color: [ 168,0,0,64],
                            angle: 0,
                            xoffset: 0,
                            yoffset: 0,
                            outline: {
                                type: 'esriSLS',
                                style: 'esriSLSSolid',
                                color: [230,0,0,255],
                                width: 1
                            }
                        },
                        polyline: {
                            type: 'esriSLS',
                            style: 'esriSLSSolid',
                            color: [230,0,0,255],
                            width: 1
                        },
                        polygon: {
                            type: 'esriSFS',
                            style: 'esriSFSSolid',
                            color: [255, 0, 255, 16],
                            outline: {
                                type: 'esriSLS',
                                style: 'esriSLSSolid',
                                color: [200, 0, 200, 192],
                                width: 1
                            }
                        }                          
                    }
                },                
                toolbarOptions: {
                },
                gridOptions: {
                    columns: this.currentParam.columns                    
                },
                featureOptions: {
                    features: true, 
                    selected: true, 
                    highlight: true, 
                    source:true,
                    zoomToSource: true, 
                    zoomToSelected: true  
                },
                queryOptions: {
                    // parameters for the query
                    queryParameters: {
                        type: 'spatial', 
                        url: this.currentParam.url +  this.currentParam.layernum,
                        maxAllowableOffset: 1,
                        outFields: this.currentParam.outfields, 
                        where: fieldname + " = ('" + value + "')" 
                    },
                    idProperty: 'OBJECTID' 
                }                
            });                
            topic.publish('viewer/togglePane', {
                pane: 'bottom', 
                show: 'block'
            });                                   
                     
        },
        waitforTableWidget: function (){
            var tableWidget = registry.byId("attributesContainer_widget");
            if (typeof tableWidget !== "undefined") {
                this.checkURLParams();
            } else {
                setTimeout(lang.hitch(this, function() {
                    this.waitforTableWidget();
                }), 250);
            }              
        }
        
    });
});
