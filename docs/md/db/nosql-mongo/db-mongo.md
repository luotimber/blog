# mongodb geonear操作



准备数据：

```
{
	"_id" : ObjectId("61712e62adf42dfea0d3bc44"),
	"c_id" : 820007,
	"powerId" : 18,
	"shuxing" : {
		"type" : "Feature",
		"properties" : {
			"adcode" : 820007,
			"name" : "路凼填海区",
			"center" : [ 113.56925, 22.136546 ],
			"centroid" : [ 113.56766, 22.139899 ],
			"childrenNum" : 0,
			"level" : "district",
			"parent" : {
				"adcode" : 820000
			},
			"subFeatureIndex" : 6,
			"acroutes" : [ 100000, 820000 ]
		},
		"geometry" : {
			"type" : "MultiPolygon",
			"coordinates" : [
				[
					[
						[ 113.553916, 22.125215 ],
						[ 113.554638, 22.142429 ],
						[ 113.550344, 22.14785 ],
						[ 113.549079, 22.149234 ],
						[ 113.551557, 22.149168 ],
						[ 113.554042, 22.149194 ],
						[ 113.563949, 22.127289 ],
						[ 113.553916, 22.125215 ]
					]
				]
			]
		}
	},
	"juli" : 1689.433845100745
}

{
	"_id" : ObjectId("61712e62adf42dfea0d3bc41"),
	"c_id" : 820004,
	"powerId" : 18,
	"shuxing" : {
		"type" : "Feature",
		"properties" : {
			"adcode" : 820004,
			"name" : "大堂区",
			"center" : [ 113.55374, 22.188119 ],
			"centroid" : [ 113.557955, 22.17835 ],
			"childrenNum" : 0,
			"level" : "district",
			"parent" : {
				"adcode" : 820000
			},
			"subFeatureIndex" : 3,
			"acroutes" : [ 100000, 820000 ]
		},
		"geometry" : {
			"type" : "MultiPolygon",
			"coordinates" : [
				[
					[
						[ 113.540985, 22.161571 ],
						[ 113.537273, 22.16918 ],
						[ 113.537107, 22.170402 ],
						[ 113.535723, 22.172545 ],
						[ 113.53456, 22.174104 ],
						[ 113.533314, 22.179271 ],
						[ 113.544576, 22.162559 ],
						[ 113.540985, 22.161571 ]
					]
				]
			]
		}
	}
}


{
	"_id" : ObjectId("61712e62adf42dfea0d3bc3b"),
	"c_id" : 810016,
	"powerId" : 7,
	"shuxing" : {
		"type" : "Feature",
		"properties" : {
			"adcode" : 810016,
			"name" : "沙田区",
			"center" : [ 114.195126, 22.379715 ],
			"centroid" : [ 114.207032, 22.386019 ],
			"childrenNum" : 0,
			"level" : "district",
			"parent" : {
				"adcode" : 810000
			},
			"subFeatureIndex" : 15,
			"acroutes" : [ 100000, 810000 ]
		},
		"geometry" : {
			"type" : "MultiPolygon",
			"coordinates" : [
				[
					[
						[ 114.214419, 22.431608 ],
						[ 114.21793, 22.429144 ],
						[ 114.220001, 22.427619 ],
						[ 114.221938, 22.426877 ],
						[ 114.227332, 22.426734 ],
						[ 114.229221, 22.427195 ],
						[ 114.214419, 22.431608 ]
					]
				]
			]
		}
	}
}
```



1、创建索引

```
//mongodb 操作
db.chengchi.createIndex(
                  {"shuxing.properties.center": "2dsphere"}
     )

// mongoTemplate操作




```

2、查询指定距离内的所有点

```
db.chengchi.aggregate([{
    $geoNear: {
      near: {
          type: "Point",
          coordinates: [ 113.559954, 22.124049 ]
      },
    //   minDistance:2,
      maxDistance:15000,
      distanceField: "juli",
      spherical: true
    }
}])
    .match({})
    .project({})
    .sort({_id:-1})
    .limit(400)

// mongoTemplate操作
 Point point1 = new Point(-73.93414657, 40.82302903);
 nearQuery = NearQuery.near(point1).maxDistance(new Distance(0.4, Metrics.KILOMETERS));
 GeoResults<Clazz> result2 = mongoTemplate.geoNear(nearQuery, Clazz.class);
 System.out.println(result2.getContent().size());
```

3、查询两个点之间的距离

```
db.chengchi.aggregate([{
    $geoNear: {
      near: {
          type: "Point",
          coordinates: [ 113.559954, 22.124049 ]
      },
      distanceField: "juli",
      spherical: true,
      query:{"c_id":820007}
    }
}])
    .match({})
    .project({})
    .sort({_id:-1})
    .limit(100)
    
// mongoTemplate操作

        Point point1 = new Point(-73.93414657, 40.82302903);
        nearQuery = NearQuery.near(point1).maxDistance(new Distance(0.4, Metrics.KILOMETERS),
        //指定另一个点作为条件查询
        	new Query().addCriteria(Criteria.where("c_id").is("80000")));
        GeoResults<Restaurants> result2 = mongoTemplate.geoNear(nearQuery, Restaurants.class);
        System.out.println(result2.getContent().size());
```

