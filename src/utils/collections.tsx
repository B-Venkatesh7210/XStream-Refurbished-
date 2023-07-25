import { ICollectionData } from "./types";
import image1 from "../../assets/images/collectionImages/image1.png";
import image2 from "../../assets/images/collectionImages/image2.png";
import image3 from "../../assets/images/collectionImages/image3.png";
import image4 from "../../assets/images/collectionImages/image4.png";
import image5 from "../../assets/images/collectionImages/image5.png";
import image6 from "../../assets/images/collectionImages/image6.png";

const collections: ICollectionData[] = [
  {
    streamId: 0,
    streamerName: "IShowSpeed",
    title: "This is a video",
    thumbnail: image1,
    categories: ["Entertainment", "Gaming"],
  },
  {
    streamId: 1,
    streamerName: "Mrbeast",
    title: "Awesome video",
    thumbnail: image2,
    categories: ["Entertainment", "Gaming", "Music"],
  },
  {
    streamId: 2,
    streamerName: "Ragnorak",
    title: "Excellent Tutorial",
    thumbnail: image3,
    categories: ["Fashion", "News"],
  },
  {
    streamId: 3,
    streamerName: "Aamir Khan",
    title: "Great Jump",
    thumbnail: image4,
    categories: ["Reaction", "Vlogs"],
  },
  {
    streamId: 4,
    streamerName: "GamerFleet",
    title: "Only Up",
    thumbnail: image5,
    categories: ["Entertainment", "Gaming"],
  },
  {
    streamId: 5,
    streamerName: "Samay Raina",
    title: "Chess Baee",
    thumbnail: image6,
    categories: ["Games", "Sports"],
  },
  {
    streamId: 6,
    streamerName: "KSI",
    title: "Gentle Reminder",
    thumbnail: image1,
    categories: ["Kratos", "Other"],
  },
  {
    streamId: 7,
    streamerName: "Logan Paul",
    title: "Boxing",
    thumbnail: image2,
    categories: ["Funny", "Comedy"],
  },
];

export default collections;
