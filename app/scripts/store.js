//Webstudio.ApplicationAdapter = DS.FixtureAdapter;
// console.log( getRestAPIURL());
Webstudio.store = DS.Store.create({
  
    adapter: DS.RESTAdapter.create({
        bulkCommit: false,
        url: getRestAPIURL()

    })
});

DS.RESTAdapter.reopen({
  host: getRestAPIURL()
});