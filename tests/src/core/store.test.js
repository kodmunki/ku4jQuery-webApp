$(function() {

    module("$.ku4webApp.store");

    test("new", function() {
        expect(1);
        ok($.ku4webApp.store($.mediator(), $.ku4webApp.config.collections, "test"));
    });

    test("find", function() {
        var data1 = {
                name: "test",
                value: "data"
            },
            data2 = {
                name: "test",
                value: "data"
            };
        var store = $.ku4webApp.store($.mediator(), $.ku4webApp.config.collections, "test").init([data1, data2]);
        var results = store.find({name: "test"});

        expect(5);
        equal(results.length, 2);
        equal(results[0].name, data1.name);
        equal(results[0].value, data1.value);
        equal(results[1].name, data2.name);
        equal(results[1].value, data2.value);
        store.remove();
    });

    test("insert", function() {
        var data = {
                name: "test",
                value: "data"
            },
            store = $.ku4webApp.store($.mediator(), $.ku4webApp.config.collections, "test")
                        .insert(data).insert(data),
            results = store.find({name: "test"});

        expect(5);
        equal(results.length, 2);
        equal(results[0].name, data.name);
        equal(results[0].value, data.value);
        equal(results[1].name, data.name);
        equal(results[1].value, data.value);
        store.remove();
    });

    test("find in", function() {
        var data1 = {
                name: "test",
                value: "data"
            },
            data2 = {
                name: "otherTest",
                value: "otherData"
            },
            data3 = {
                name: "testToo",
                value: "moreData"
            },
            store = $.ku4webApp.store($.mediator(), $.ku4webApp.config.collections, "test")
                    .insert(data1).insert(data2).insert(data3);
        expect(3);
        var testData = store.find({$in: {name: ["test", "testToo"]}, $orderby: {value: 1}});
        equal(testData.length, 2);
        equal(testData[0].value, data1.value);
        equal(testData[1].value, data3.value);
        store.remove();
    });

    test("update", function() {
        var data = {
                name: "test",
                value: "data"
            },
            store = $.ku4webApp.store($.mediator(), $.ku4webApp.config.collections, "test");
        store.insert(data);

        expect(4);
        var testData = store.find({name: "test"})[0];
        equal(testData.name, data.name);
        equal(testData.value, data.value);

        testData.name = "newTester";

        store.update({"_ku4Id": testData._ku4Id}, testData);
        var updateData = store.find({"_ku4Id": testData._ku4Id})[0];
        equal(updateData.name, "test");
        equal(updateData.value, data.value);
    });

    test("remove", function() {
        var data = {
            name: "test",
            value: "data"
            },
            store = $.ku4webApp.store($.mediator(), $.ku4webApp.config.collections, "test");
        store.insert(data);

        expect(3);
        var testData = store.find({name: "test"})[0];
        equal(testData.name, data.name);
        equal(testData.value, data.value);
        store.remove();
        equal(store.find().length, 0);
    });

    test("join", function() {
        var collection1 = $.ku4collection("collection1", {
                "kuid1": {
                    "id": 100,
                    "name": "myName1"
                },
                "kuid2": {
                    "id": 200,
                    "name": "myName2"
                },
                "kuid3": {
                    "id": 300,
                    "name": "myName3"
                }
            }),
            collection2 = $.ku4collection("collection2", {
                "kuid1": {
                    "id": 110,
                    "cid": 100,
                    "name": "otherName1"
                },
                "kuid2": {
                    "id": 120,
                    "cid": 200,
                    "name": "otherName1"
                },
                "kuid3": {
                    "id": 130,
                    "cid": 300,
                    "name": "otherName3"
                }
            });
        $.ku4store().write(collection1).write(collection2);

        var config = {
                test1: { name: "collection1" },
                test2: { name: "collection2" }
            },
            store = $.ku4webApp.store($.mediator(), config, "test1"),
            result1 = store.join("test2", "id", "cid").find({
                "collection1.name": "myName2",
                "collection2.name": "otherName1"
            })[0],
            result2 = store.join("collection2", "id", "cid").find({
                "collection1.name": "myName2",
                "collection2.name": "otherName1"
            })[0];

        expect(8);
        equal(result1["collection1.id"], 200);
        equal(result1["collection2.id"], 120);
        equal(result1["collection1.name"], "myName2");
        equal(result1["collection2.name"], "otherName1");

        equal(result2["collection1.id"], 200);
        equal(result2["collection2.id"], 120);
        equal(result2["collection1.name"], "myName2");
        equal(result2["collection2.name"], "otherName1");
    });

    test("exec", function() {
        var data1 = {
                name: "test",
                value: "data"
            },
            data2 = {
                name: "test",
                value: "data"
            };
        var store = $.ku4webApp.store($.mediator(), $.ku4webApp.config.collections, "test")
                        .init([data1, data2]).exec(function(item) { return {"id": item.name, "value": 1}});
        var results = store.find({name: "test"});

        expect(5);
        equal(results.length, 2);
        equal(results[0].id, data1.name);
        equal(results[0].value, 1);
        equal(results[1].id, data2.name);
        equal(results[1].value, 1);
        store.remove();
    });
});