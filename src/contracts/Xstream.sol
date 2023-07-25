// SPDX-License-Identifier: MIT
pragma solidity 0.8.19;

import "@openzeppelin/contracts/utils/Counters.sol";
import "./XstreamNFT.sol";

//Xstream contract address = 0x90e73FAa2202A16dA36E4938795786Fc28bD92b6 (Hyperspace)
//Xstream contract address = 0xB206ff81102e812240437A7E5411059837009cbE (polygonMumbai)

contract xstream {

    using Counters for Counters.Counter;
    Counters.Counter public userId;

    using Counters for Counters.Counter;
    Counters.Counter public streamId;

    using Counters for Counters.Counter;
    Counters.Counter public streamerId;

    XstreamNFT public nftContract;

    struct User {
        uint256 userId;
        address payable userAdd;
        string name;
        string desp;
        string profilePicture;
        string[] collection;
        address[] following;
    }

    struct Streamer {
        uint256 streamerId;
        address payable streamerAdd;
        string name;
        string desp;
        string nftImage;
        string profilePicture;
        uint totalNfts;
        string[] categories;
        address[] followers;
        address[] following;
        uint256 subscribers;
        bool isLive;
        string[] recordingUrls;
    }
    
    struct Stream{
        uint streamId;
        address payable streamer;
        string streamerName;
        string roomId;
        string title;
        string desp;
        string thumbnail;
        bool exclusive;
        string[] categories;
        string hashtags;
        bool isLive;
        uint256 totalAmount;
    }

    struct Chat{
        address sender;
        string name;
        string message;
        uint256 amount;
        bool isSubscriber;
    }

    constructor(address _nftContractAddress){
        nftContract = XstreamNFT(_nftContractAddress);
    }

    mapping(address=>bool) public isUser;
    mapping(address=>bool) public isStreamer;
    mapping(address=>User) public addToUser;
    mapping(address=>Streamer) public addToStreamer;
    mapping(uint=>Stream) public idToStream;
    mapping(uint=>Chat[]) public idToChats;
    mapping(address=>uint256) public streamerToBalance;
    mapping(address=>mapping(address=>bool)) public userFollowsStreamer;
    mapping(address=>mapping(address=>bool)) public streamerFollowsStreamer;
    Stream[] public liveStreams;
    uint[] public liveStreamIndices;

    event ChatReceived(address sender, string name, string message, uint256 amount, bool isSubscriber);
    event StreamStarted(uint streamId, address streamer);
    event StreamStopped(uint streamId, address streamer, string streamerName);

    function createUser (string memory _name, string memory _desp, string memory _profilePicture) public {
        require(!isUser[msg.sender], "You are already a user" );
        User storage currUser = addToUser[msg.sender];
        string[] memory empty;
        address[] memory empty2;
        uint256 currUserId = userId.current();
        currUser.userId = currUserId;
        currUser.userAdd = payable(msg.sender);
        currUser.name = _name;
        currUser.desp = _desp;
        currUser.profilePicture = _profilePicture;
        currUser.collection = empty;
        currUser.following = empty2;
        isUser[msg.sender] = true;
        addToUser[msg.sender] = currUser;
        userId.increment();
    }

    function editUser (string memory _name, string memory _desp, string memory _profilePicture) public {
        require(isUser[msg.sender], "You are not a user");
        User storage currUser = addToUser[msg.sender];
        currUser.name = _name;
        currUser.desp = _desp;
        currUser.profilePicture = _profilePicture;
    }

    function createStreamer (string memory _name, string memory _desp, string memory _metadata, string memory _nftImage, string memory _profilePicture, uint _totalNfts, string[] memory _categories) public {
        require(!isStreamer[msg.sender], "You are already a streamer");
        Streamer storage currStreamer = addToStreamer[msg.sender];
        address[] memory empty;
        string[] memory empty2;
        uint256 currStreamerId = streamerId.current();
        currStreamer.streamerId = currStreamerId;
        currStreamer.streamerAdd = payable(msg.sender);
        currStreamer.name = _name;
        currStreamer.desp = _desp;
        currStreamer.nftImage = _nftImage;
        currStreamer.profilePicture = _profilePicture;
        currStreamer.totalNfts = _totalNfts;
        currStreamer.categories = _categories;
        currStreamer.followers = empty;
        currStreamer.following = empty;
        currStreamer.subscribers = 0;
        currStreamer.isLive = false;
        currStreamer.recordingUrls = empty2;
        isStreamer[msg.sender] = true;
        addToStreamer[msg.sender] = currStreamer;
        nftContract.addMetadata(_metadata, currStreamerId);
        //  ipfs://baf
        streamerId.increment();
        User storage currUser = addToUser[msg.sender];
        currUser.userId = 0;
        currUser.userAdd = payable(address(0));
        currUser.name = "";
        currUser.desp = "";
        currUser.profilePicture = "";
        isUser[msg.sender] = false;
    }

    function startStream (string memory _title, string memory _thumbnail, string memory _desp, string memory _roomId, bool _exclusive, string[] memory _categories, string memory _hashtags) public {
        Streamer storage currStreamer = addToStreamer[msg.sender];
        require(isStreamer[msg.sender], "You are not a streamer");
        require(!currStreamer.isLive, "You are already live streaming");
        uint currStreamId = streamId.current();
        Stream storage currStream = idToStream[currStreamId];
        currStream.streamId = currStreamId;
        currStream.streamer = payable(msg.sender);
        currStream.streamerName = currStreamer.name;
        currStream.roomId = _roomId;
        currStream.title = _title;
        currStream.desp = _desp;
        currStream.thumbnail = _thumbnail;
        currStream.exclusive = _exclusive;
        currStream.categories = _categories;
        currStream.hashtags = _hashtags;
        currStream.isLive = true;
        currStream.totalAmount = 0;
        currStreamer.isLive = true;
        liveStreams.push(currStream);
        liveStreamIndices.push(currStreamId);
        streamId.increment();
        emit StreamStarted(currStreamId, msg.sender);
    }

    function stopStream (uint _streamId) public {
        Stream storage currStream = idToStream[_streamId];
        Streamer storage currStreamer = addToStreamer[msg.sender];
        uint currStreamId = streamId.current();
        require(_streamId < currStreamId, "Stream ID is out of bounds");
        require(currStream.streamer == msg.sender, "You are not the streamer");
        require(currStream.isLive, "Stream is not live");
        currStream.isLive = false;
        currStreamer.isLive = false;
    //      if (_streamId < currStreamId-1) {
    //     liveStreams[_streamId] = liveStreams[currStreamId - 2];
    //     idToStream[liveStreams[_streamId].streamId].streamId = _streamId;
    // }
    // liveStreams.pop();
         // Find the index of the stream in the liveStreams array
    uint index = 0;
    for (uint i = 0; i < liveStreams.length; i++) {
        if (liveStreams[i].streamId == _streamId) {
            index = i;
            break;
        }
    }

    // Remove the stream from the liveStreams array
    if (index < liveStreams.length - 1) {
        liveStreams[index] = liveStreams[liveStreams.length - 1];
    }
    liveStreams.pop();
    for (uint i = 0; i < liveStreamIndices.length; i++) {
        if (liveStreamIndices[i] == _streamId) {
            if (i < liveStreamIndices.length - 1) {
                liveStreamIndices[i] = liveStreamIndices[liveStreamIndices.length - 1];
            }
            liveStreamIndices.pop();
            break;
        }
    }
    emit StreamStopped(_streamId, currStream.streamer, currStream.streamerName);
    }
    
    function getLiveStreams() public view returns (Stream[] memory) {
        return liveStreams;
    }

    function watchStream(uint _streamId) public view {
        Stream storage currStream = idToStream[_streamId];
        require(currStream.isLive, "The stream is not live");
    }

    function chat(uint _streamId, string memory _name, string memory _message, bool _isSubscriber) public payable {
        Stream storage currStream = idToStream[_streamId];
        require(currStream.isLive, "The stream is not live");
        if(msg.value>0){
        currStream.totalAmount+=msg.value;
        streamerToBalance[currStream.streamer]+=msg.value;
        idToChats[_streamId].push(Chat({sender: msg.sender, name: _name, message: _message, amount: msg.value, isSubscriber: _isSubscriber}));
        emit ChatReceived(msg.sender, _name, _message, msg.value, _isSubscriber);
        }else{
        idToChats[_streamId].push(Chat({sender: msg.sender, name: _name, message: _message, amount: 0, isSubscriber: _isSubscriber}));
        emit ChatReceived(msg.sender, _name, _message, 0, _isSubscriber);
        }
       
    }

    
    function mintNft(address _streamer) public {
        require(isStreamer[_streamer], "Address given is not a streamer");
        require(msg.sender!=_streamer, "You cannot mint NFT to yourself");
        Streamer storage currStreamer = addToStreamer[_streamer];
        uint256 balance = nftContract.balanceOf(msg.sender, currStreamer.streamerId);
        require(balance==0, "You already own an NFT");
        nftContract.mint(msg.sender, currStreamer.streamerId, 1, "", currStreamer.totalNfts);
        currStreamer.subscribers++;
    }

    function extractBalance() public payable {
        require(isStreamer[msg.sender],"You are not a streamer");
        payable(msg.sender).transfer(streamerToBalance[msg.sender]);
        streamerToBalance[msg.sender] = 0;
    }

    function getAllChats(uint256 _streamId) public view returns (Chat[] memory) {
        return idToChats[_streamId];
    }

    function saveRecording(string memory _recordingUrl, uint256 _streamId) public {
        Stream storage currStream = idToStream[_streamId];
        Streamer storage currStreamer = addToStreamer[msg.sender];
        uint currStreamId = streamId.current();
        require(_streamId < currStreamId, "Stream ID is out of bounds");
        require(currStream.streamer == msg.sender, "You are not the streamer");
        require(currStream.isLive, "Stream is not live");
        currStreamer.recordingUrls.push(_recordingUrl);
    }

    function follow(address _streamerAdd) public {
        require(isUser[msg.sender] || isStreamer[msg.sender], "You should be a user or a streamer");
        require(isStreamer[_streamerAdd], "Address is not a streamer");
        require(msg.sender!=_streamerAdd, "You cannot follow yourself");
        if(isUser[msg.sender]){
            User storage currUser = addToUser[msg.sender];
            currUser.following.push(_streamerAdd);
            userFollowsStreamer[msg.sender][_streamerAdd] = true;
            Streamer storage currStreamer = addToStreamer[_streamerAdd];
            currStreamer.followers.push(msg.sender);
        }
        else if(isStreamer[msg.sender]){
            Streamer storage currStreamer = addToStreamer[msg.sender];
            currStreamer.following.push(msg.sender);
            streamerFollowsStreamer[msg.sender][_streamerAdd] = true;
            Streamer storage currStreamer2 = addToStreamer[_streamerAdd];
            currStreamer2.followers.push(msg.sender);
        }

    }

    function unfollow(address _streamerAdd) public {
    require(isUser[msg.sender] || isStreamer[msg.sender], "You should be a user or a streamer");
    require(isStreamer[_streamerAdd], "Address is not a streamer");
    require(msg.sender != _streamerAdd, "You cannot follow yourself");
    require(userFollowsStreamer[msg.sender][_streamerAdd] || streamerFollowsStreamer[msg.sender][_streamerAdd], "You do not follow the Streamer");

    if (userFollowsStreamer[msg.sender][_streamerAdd]) {
        User storage currUser = addToUser[msg.sender];
        uint256 indexToRemove = findAddress(_streamerAdd, currUser.following);
        if (indexToRemove < currUser.following.length) {
            // Replace the element at the index with the last element in the array
            currUser.following[indexToRemove] = currUser.following[currUser.following.length - 1];
            // Decrease the array length by 1 to remove the last element
            currUser.following.pop();
        }

        Streamer storage currStreamer = addToStreamer[_streamerAdd];
        uint256 indexToRemove2 = findAddress(msg.sender, currStreamer.followers);
        if (indexToRemove2 < currStreamer.followers.length) {
            // Replace the element at the index with the last element in the array
            currStreamer.followers[indexToRemove2] = currStreamer.followers[currStreamer.followers.length - 1];
            // Decrease the array length by 1 to remove the last element
            currStreamer.followers.pop();
        }
        userFollowsStreamer[msg.sender][_streamerAdd] = false;
    }

    if (streamerFollowsStreamer[msg.sender][_streamerAdd]) {
        Streamer storage currStreamer = addToStreamer[msg.sender];
        uint256 indexToRemove = findAddress(_streamerAdd, currStreamer.following);
        if (indexToRemove < currStreamer.following.length) {
            // Replace the element at the index with the last element in the array
            currStreamer.following[indexToRemove] = currStreamer.following[currStreamer.following.length - 1];
            // Decrease the array length by 1 to remove the last element
            currStreamer.following.pop();
        }

        Streamer storage currStreamer2 = addToStreamer[_streamerAdd];
        uint256 indexToRemove2 = findAddress(msg.sender, currStreamer2.followers);
        if (indexToRemove2 < currStreamer2.followers.length) {
            // Replace the element at the index with the last element in the array
            currStreamer2.followers[indexToRemove2] = currStreamer2.followers[currStreamer2.followers.length - 1];
            // Decrease the array length by 1 to remove the last element
            currStreamer2.followers.pop();
        }
        streamerFollowsStreamer[msg.sender][_streamerAdd] = false;
    }
}
    function findAddress(address addressToFind, address[] memory arrayOfAddress) internal pure returns (uint256) {
        for (uint256 i = 0; i < arrayOfAddress.length; i++) {
            if (arrayOfAddress[i] == addressToFind) {
                return i;
            }
        }
        return arrayOfAddress.length; // If not found, return an out-of-bounds index
    }

    

    //Getter Functions

    function getUserCollection(address _user) public view returns (string[] memory) {
    require(isUser[_user], "You are not a user");
    User storage currUser = addToUser[_user];
    return currUser.collection;
    }

    function getUserFollowing(address _user) public view returns (address[] memory) {
    require(isUser[_user], "You are not a user");
    User storage currUser = addToUser[_user];
    return currUser.following;
    }

    function getStreamerCategories(address _streamer) public view returns(string[] memory) {
        require(isStreamer[_streamer], "You are not a user");
        Streamer storage currStreamer = addToStreamer[_streamer];
        return currStreamer.categories;
    }

    function getStreamerFollowers(address _streamer) public view returns (address[] memory) {
    require(isStreamer[_streamer], "You are not a streamer");
    Streamer storage currStreamer = addToStreamer[_streamer];
    return currStreamer.followers;
    }

    function getStreamerFollowing(address _streamer) public view returns (address[] memory) {
    require(isStreamer[_streamer], "You are not a streamer");
    Streamer storage currStreamer = addToStreamer[_streamer];
    return currStreamer.following;
    }

    function getStreamerRecordingUrls(address _streamer) public view returns (string[] memory) {
    require(isStreamer[_streamer], "You are not a streamer");
    Streamer storage currStreamer = addToStreamer[_streamer];
    return currStreamer.recordingUrls;
    }

    function getStreamCategories(uint _streamId) public view returns (string[] memory) {
    require(_streamId < streamId.current(), "Stream ID is out of bounds");
    Stream storage currStream = idToStream[_streamId];
    require(currStream.isLive, "Stream is not live");
    return currStream.categories;
    }

}