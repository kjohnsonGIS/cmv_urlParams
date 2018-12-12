# cmv_urlParams
allows passing map/feature server based url parameters to select and zoom CMV map using @tmcgee's great [attribute table widget](https://github.com/tmcgee/cmv-widgets#attributes-tables)

*Having the attribute table widget installed in required.*  

Currently only queries for a single field/single value i.e.  APN = 1234508    
- In the config you get to choose what the parameter name should be.   
- You can configure as many layers as you want, but the url can only specify 1 query at a time.  
- Query parameters have to be in this order in the url:  tablename, fieldname, value.   
To find a countyparcel where APN = 1234567:
?opensomething=CountyParcels&opensomething=APN&opensomething=1234567
- For any given config any field can queried.  For example, to find a countyparcel where PIN = 012-345-67: ?opensomething=CountyParcels&opensomething=PIN&opensomething=012-345-67
- The tablename parameter is arbitrary (it doesn't need to be a tablename in your gis or something) but the tablename  in the url has to match a tablename in one of the configured layers.  

Here's an example widget config in viewer.js
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
            }
```            
