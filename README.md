#Hearthone.gg proxy layer

Devops - listens on 80 and 443 and proxies to the correct servies.

HTTPS passthrough for auth
Socket passthrough for socket

###Install

``npm install``

###Run

```sudo npm start```

###View

All services are defined in the ``hs.gg-config`` package in ``envs/*.json``

PM2 config is in ``./pm2.json``

Adding a new service requires updating both 

For local dev. add the new service to ``/etc/hosts``