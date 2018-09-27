const express = require('express');
const path = require('path');

const app = express();
const port = 3000;

var server = require("http").createServer(app);
var io = require("socket.io")(server);

app.use(express.static(path.join(__dirname, '/public')));

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.get('/', (req, res) => {
  res.render('index');
});

const Web3 = require("web3");
var web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8542"));
console.log(web3.eth.accounts[0]);

var abi = [
	{
		"constant": true,
		"inputs": [
			{
				"name": "fileHash",
				"type": "string"
			}
		],
		"name": "get",
		"outputs": [
			{
				"name": "blockNumber",
				"type": "uint256"
			},
			{
				"name": "owner",
				"type": "string"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "owner",
				"type": "string"
			},
			{
				"name": "fileHash",
				"type": "string"
			}
		],
		"name": "set",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"name": "status",
				"type": "bool"
			},
			{
				"indexed": false,
				"name": "blockTime",
				"type": "uint256"
			},
			{
				"indexed": false,
				"name": "blockNumber",
				"type": "uint256"
			},
			{
				"indexed": false,
				"name": "owner",
				"type": "string"
			},
			{
				"indexed": false,
				"name": "fileHash",
				"type": "string"
			}
		],
		"name": "logfileInfo",
		"type": "event"
	}
];
var contractAddress = "0xf34d4af1af1464842113a30ba1c1a82fb7e40b11";

var contract = web3.eth.contract(abi).at(contractAddress);

app.get("/submit", function(req, res) {

  var fileHash = req.query.filehash;
	var owner = req.query.owner;

  console.log("fileHash : "+fileHash);
  console.log("owner : " + owner);

  web3.personal.unlockAccount(web3.eth.accounts[0], "");

	contract.set.sendTransaction(owner, fileHash, {
		from: web3.eth.accounts[0], gas: 1000000
	}, function(error, transactionHash) {

		if (!error) res.send(transactionHash);
		else res.send("Error");

    console.log("transactionHash : " + transactionHash);
    web3.personal.lockAccount(web3.eth.accounts[0]);

	});


});

app.get("/getInfo", function(req, res){

  console.log("getInfo");

  var rtn = new Object();
	var fileHash = req.query.hash;

  console.log("fileHash : " + fileHash);
	var details = contract.get.call(fileHash.trim());
  var blockNumber = details[0].toString(10);
  var owner = details[1];
  console.log("blockNumber : " + details[0].toString(10));
  console.log("owner : " + details[1]);

  console.log("transactions : " + web3.eth.getBlock(blockNumber).transactions[0]);

  rtn.fileHash = fileHash;
  rtn.owner = owner;
  rtn.transaction = web3.eth.getBlock(blockNumber).transactions[0];

	res.send(rtn);
})

contract.logfileInfo().watch(function(error, result){
  console.log("Event");
	if(!error) {
		console.log(result);
    io.send(result);
	}
})

server.listen(port, () => {
  console.log('Listening on port ' + port);
}).on('error', (err) => {
  console.error(err);
});
