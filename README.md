#Hearthone.gg proxy layer

Devops - listens on 80 and 443 and proxies to the correct servies.

HTTPS passthrough for auth
Socket passthrough for socket

Assumes all apps are in ../

Install

``npm install``

Run

```sudo npm start```
```pm2 start pm2.json```
