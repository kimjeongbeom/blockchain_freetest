pragma solidity ^0.4.25;

contract FileContract
{
    struct FileInfo {
        uint blockTime;
        uint blockNumber;
        string owner;
    }

    mapping (string => FileInfo) files;
    event logfileInfo(bool status, uint blockTime, uint blockNumber, string owner, string fileHash);

    function set(string owner, string fileHash) public {
        if(files[fileHash].blockTime == 0) {
            files[fileHash] = FileInfo(block.timestamp, block.number, owner);
            emit logfileInfo(true, block.timestamp, block.number, owner, fileHash);
        } else {
            emit logfileInfo(false, block.timestamp, block.number, owner, fileHash);
        }
    }

    function get(string fileHash) public view returns (uint blockNumber, string owner) {
        return (files[fileHash].blockNumber, files[fileHash].owner);
    }
}
