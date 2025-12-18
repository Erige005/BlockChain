// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract Copyright {
    struct Comment {
        address user;
        string content;
        uint256 timestamp;
    }

    struct CopyrightInfo {
        address originalCreator; // 0
        address owner;           // 1
        string authorName;       // 2
        string fileName;         // 3
        string fileDescription;  // 4
        string fileHash;         // 5
        uint256 timestamp;       // 6
        string fileUrl;          // 7
        uint256 price;           // 8
        bool isForSale;          // 9
        uint256 royaltyPercent;  // 10
        uint256 likeCount;       // 11
    }

    mapping(string => CopyrightInfo) public copyrights;
    mapping(string => Comment[]) public fileComments;
    mapping(string => mapping(address => bool)) public hasLiked; // Kiem tra da like chua
    string[] public allFileHashes;

    event CopyrightRegistered(address indexed owner, string fileHash, uint256 timestamp);
    event CopyrightSold(address from, address to, uint256 price, string fileHash);
    event ListingCanceled(string fileHash);
    event FileLiked(string fileHash, address user);
    event CommentAdded(string fileHash, address user, string content);

    function register(
        string memory _authorName,
        string memory _fileName,
        string memory _fileDescription,
        string memory _fileHash, 
        string memory _fileUrl,
        uint256 _royaltyPercent
    ) public {
        require(copyrights[_fileHash].owner == address(0), "DUPLICATE_HASH");
        
        copyrights[_fileHash] = CopyrightInfo(
            msg.sender, msg.sender, _authorName, _fileName, 
            _fileDescription, _fileHash, block.timestamp, _fileUrl, 
            0, false, _royaltyPercent, 0
        );
        allFileHashes.push(_fileHash);
        emit CopyrightRegistered(msg.sender, _fileHash, block.timestamp);
    }

    function buyCopyright(string memory _fileHash) public payable {
        CopyrightInfo storage info = copyrights[_fileHash];
        require(info.isForSale == true, "Not for sale");
        require(msg.value >= info.price, "Not enough ETH");
        require(msg.sender != info.owner, "Cannot buy own");

        address oldOwner = info.owner;
        address creator = info.originalCreator;
        uint256 price = info.price;
        
        // Tra hoa hong (Royalty)
        uint256 royaltyAmount = (price * info.royaltyPercent) / 100;
        uint256 sellerAmount = price - royaltyAmount;

        payable(oldOwner).transfer(sellerAmount);
        if (royaltyAmount > 0 && creator != oldOwner) {
            payable(creator).transfer(royaltyAmount);
        }

        info.owner = msg.sender;
        info.isForSale = false;
        info.price = 0;
        emit CopyrightSold(oldOwner, msg.sender, price, _fileHash);
    }

    function likeFile(string memory _fileHash) public {
        require(!hasLiked[_fileHash][msg.sender], "Already liked");
        copyrights[_fileHash].likeCount += 1;
        hasLiked[_fileHash][msg.sender] = true;
        emit FileLiked(_fileHash, msg.sender);
    }

    function addComment(string memory _fileHash, string memory _content) public {
        fileComments[_fileHash].push(Comment(msg.sender, _content, block.timestamp));
        emit CommentAdded(_fileHash, msg.sender, _content);
    }

    function getComments(string memory _fileHash) public view returns (Comment[] memory) {
        return fileComments[_fileHash];
    }

    function listForSale(string memory _fileHash, uint256 _price) public {
        require(msg.sender == copyrights[_fileHash].owner, "Not owner");
        copyrights[_fileHash].price = _price;
        copyrights[_fileHash].isForSale = true;
    }

    function cancelListing(string memory _fileHash) public {
        require(msg.sender == copyrights[_fileHash].owner, "Not owner");
        copyrights[_fileHash].isForSale = false;
        copyrights[_fileHash].price = 0;
        emit ListingCanceled(_fileHash);
    }

    // Tra ve FULL thong tin
    function getCopyright(string memory _fileHash) public view returns (CopyrightInfo memory) {
        return copyrights[_fileHash];
    }

    function getTotalProducts() public view returns (uint256) {
        return allFileHashes.length;
    }
}