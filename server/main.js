import '/imports/startup/server';

ServiceConfiguration.configurations.upsert(
  { service: "azureAd" },
  { $set: { clientId: "clientId", 
            tennantId: "tenantId",
            clientSecret: "clientSecret",
            loginStyle: "popup",
            secret: "secret" ,
            tenantId: "tenantId"
  }
}
);
