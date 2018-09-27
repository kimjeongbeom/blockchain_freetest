file download URL
- sha1 : http://pajhome.org.uk/crypt/md5/scripts.html
- socket.io : https://socket.io
- bootstrap : http://getbootstrap.com/docs/4.0/layout/overview/
- javascript file reader : https://www.javascripture.com/FileReader


geth init cmd

1. genesis block make
./geth --datadir /root/geth_data/1 init /root/geth_data/genesis.json

2. private geth start
./geth --datadir /root/geth_data/1 --networkid 42 --rpc --rpcaddr "0.0.0.0" --rpcport "8542" --rpccorsdomain="*" --rpcapi "admin,db,eth,debug,miner,net,shh,txpool,personal,web3" --port 3032 --nodiscover

geth attach ipc:/root/geth_data/1/geth.ipc

2-1(Win).
geth --datadir D:\Work\geth_data\private_data --networkid 42 --rpc --rpcaddr "0.0.0.0" --rpcport "8542" --rpccorsdomain="*" --rpcapi "admin,db,eth,debug,miner,net,shh,txpool,personal,web3" --port 3032 --nodiscover

geth attach ipc:\\.\pipe\geth.ipc

3. Account make
personal.newAccount("")
personal.unlockAccount(eth.accounts[0], "")
