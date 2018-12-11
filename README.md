# cmv_urlParams
allows passing map/feature server based url parameters to select and zoom CMV map using @tmcgee's great [attribute table widget](https://github.com/tmcgee/cmv-widgets#attributes-tables)

*Having the attribute table widget installed in required.  

Currently only queries for a single field/single value i.e.  APN = 1234508  Maybe in the future it could be modified to use an IN or LIKE statement.   
- In the config you get to choose what the parameter name should be.   You can configure as many layers as you want, but in the url you can only specify 1 query at a time.  
- Query parameters have to be in this order in the url:  tablename, fieldname, value.   
based on the below example config, if you wanted to query a CountyParcel by url parameters you could append this to your cmv url:
?opensomething=CountyParcels&opensomething=APN&opensomething=1234567
where 1234567 is the apn you're querying.  
- Also the tablename parameter is arbitrary (it doenst need to be a tablename in your gis or something, the layer is specified by the mapserver number) but the tablename you specify in a url has to match the tablename in each config  (the first parameter).  
example config in viewer.js
```javascript
            urlParams: {
                include:true, 
                id: 'urlParamZoomer', 
                type: 'invisible', 
                path: 'gis/dijit/Widgets/urlParams', 
                options: {
                    urlParamName: 'opensomething',
                    urlParams: [
                        {
                            tablename: 'CountyParcels', 
                            url: 'https://myserver/arcgis/rest/services/queryservice/MapServer/',
                            layernum: 0,
                            columns: [
                                {
                                    field: 'OBJECTID',
                                    label: 'OBJECTID'
                                },
                                {
                                    field: 'APN',
                                    label: 'APN',                               
                                },
                                {
                                    field: 'PIN',
                                    label: 'PIN'
                                },
                                {
                                    field: 'LASTNAME',
                                    label: 'LASTNAME'
                                }
                            ],
                            outfields: ["OBJECTID", "APN", "PIN", "LASTNAME"]
                        },
                        {
                            tablename: 'SystemValves',
                            url: 'https://myserver/arcgis/rest/services/Facilities/MapServer/',
                            layernum: 20,
                            columns: [
                                {
                                    field: 'OBJECTID',
                                    label: 'OBJECTID'
                                },
                                {
                                    field: 'FACILITYID',
                                    label: 'FACILITYID'
                                }
                            ],
                            outfields: ['OBJECTID', 'FACILITYID']
                        },
                        {
                            tablename:'Editpoints',
                            url: 'https://myserver/arcgis/rest/services/FeaturesEdit/FeatureServer/',
                            layernum: 4, 
                            columns: [
                                {
                                    field: 'OBJECTID', 
                                    label: 'OBJECTID'
                                },
                                {
                                    field: 'COMMENT',
                                    label: 'COMMENT'
                                }
                            ],
                            outfields: ['OBJECTID', 'COMMENT']
                        }
                    ]
                }
            }```
            
