require("dotenv").config();
const seeder = require("mongoose-seed");

const db = process.env.MONGO_URI;

const posts = [
  {
    model: "Post",
    documents: [
      {
        author: "5ef66cf0fd1ef34ca10d26cb",
        body: "Brunch is the only thing I look forward to all week. Help.",
        image:
          "https://images.unsplash.com/photo-1564759224907-65b945ff0e84?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80",
        likes: [
          "5ef66cf0fd1ef34ca10d26d0",
          "5ef66cf0fd1ef34ca10d26cf",
          "5ef66cf0fd1ef34ca10d26d1",
        ],
        shares: ["5ef66cf0fd1ef34ca10d26d4"],
        comments: [
          {
            commenter: "5ef66cf0fd1ef34ca10d26d5",
            body: "OMG saaaaaaaaame",
            likes: ["5ef66cf0fd1ef34ca10d26cb"],
          },
        ],
      },
      {
        author: "5ef66cf0fd1ef34ca10d26ce",
        body: "Made some absolutely delicious cookies today. Recipe to follow!",
        image:
          "https://images.unsplash.com/photo-1567815883164-6ddafaec000d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1351&q=80",
        likes: [
          "5ef66cf0fd1ef34ca10d26cb",
          "5ef66cf0fd1ef34ca10d26d5",
          "5ef66cf0fd1ef34ca10d26d3",
        ],
        shares: ["5ef66cf0fd1ef34ca10d26cc"],
        comments: [
          {
            commenter: "5ef66cf0fd1ef34ca10d26d2",
            body: "Soo jelly",
            likes: ["5ef66cf0fd1ef34ca10d26d4"],
          },
          {
            commenter: "5ef66cf0fd1ef34ca10d26d0",
            body: "1 pls",
            likes: ["5ef66cf0fd1ef34ca10d26ce", "5ef66cf0fd1ef34ca10d26cd"],
          },
        ],
      },
      {
        author: "5ef66cf0fd1ef34ca10d26cf",
        body:
          "Supremely tired of all my usual haunts. Does anyone have any new restaurant recommendations in Dubai?",
        likes: [
          "5ef66cf0fd1ef34ca10d26d5",
          "5ef66cf0fd1ef34ca10d26cc",
          "5ef66cf0fd1ef34ca10d26ce",
        ],
        shares: ["5ef66cf0fd1ef34ca10d26d2"],
        comments: [
          {
            commenter: "5ef66cf0fd1ef34ca10d26d5",
            body: "Amazonico at DIFC is prime :)",
            likes: ["5ef66cf0fd1ef34ca10d26d0"],
          },
          {
            commenter: "5ef66cf0fd1ef34ca10d26d0",
            body: "Second Amazonico!!",
            likes: ["5ef66cf0fd1ef34ca10d26cf", "5ef66cf0fd1ef34ca10d26ce"],
          },
        ],
      },
      {
        author: "5ef66cf0fd1ef34ca10d26d0",
        body: "Don't mind if I do.",
        image:
          "https://images.unsplash.com/photo-1572627050498-5d89b1805309?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=750&q=80",
        likes: [
          "5ef66cf0fd1ef34ca10d26d1",
          "5ef66cf0fd1ef34ca10d26d2",
          "5ef66cf0fd1ef34ca10d26d3",
        ],
        shares: ["5ef66cf0fd1ef34ca10d26ce"],
        comments: [
          {
            commenter: "5ef66cf0fd1ef34ca10d26d4",
            body: "Oi stop ghosting me",
            likes: ["5ef66cf0fd1ef34ca10d26cc"],
          },
          {
            commenter: "5ef66cf0fd1ef34ca10d26cb",
            body: "Bro",
            likes: ["5ef66cf0fd1ef34ca10d26d0", "5ef66cf0fd1ef34ca10d26cd"],
          },
        ],
      },
      {
        author: "5ef66cf0fd1ef34ca10d26d1",
        body:
          "Someone please teach me how to make some real Thai food. My attempts have all been disasters!!",
        likes: [
          "5ef66cf0fd1ef34ca10d26d4",
          "5ef66cf0fd1ef34ca10d26d5",
          "5ef66cf0fd1ef34ca10d26d2",
          "5ef66cf0fd1ef34ca10d26cb",
        ],
        shares: ["5ef66cf0fd1ef34ca10d26cc"],
        comments: [
          {
            commenter: "5ef66cf0fd1ef34ca10d26ce",
            body: "My child, I will show you the way",
            likes: ["5ef66cf0fd1ef34ca10d26d1"],
          },
          {
            commenter: "5ef66cf0fd1ef34ca10d26d3",
            body: "lol what do you even know about Thai food Margs",
            likes: ["5ef66cf0fd1ef34ca10d26d0", "5ef66cf0fd1ef34ca10d26d2"],
          },
        ],
      },
      {
        author: "5ef66cf0fd1ef34ca10d26d2",
        body: "Successful farmers market haul",
        image:
          "https://images.unsplash.com/photo-1563699498778-aa8246fa5456?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1504&q=80",
        likes: [
          "5ef66cf0fd1ef34ca10d26d5",
          "5ef66cf0fd1ef34ca10d26d2",
          "5ef66cf0fd1ef34ca10d26ce",
          "5ef66cf0fd1ef34ca10d26cf",
          "5ef66cf0fd1ef34ca10d26d0",
        ],
        shares: ["5ef66cf0fd1ef34ca10d26d0"],
      },
      {
        author: "5ef66cf0fd1ef34ca10d26d3",
        body: "Ok, I'll bite: what is a Baby Yoda and how do I eat it?",
        likes: [
          "5ef66cf0fd1ef34ca10d26d5",
          "5ef66cf0fd1ef34ca10d26d2",
          "5ef66cf0fd1ef34ca10d26ce",
          "5ef66cf0fd1ef34ca10d26cf",
          "5ef66cf0fd1ef34ca10d26d0",
          "5ef66cf0fd1ef34ca10d26cd",
        ],
        shares: ["5ef66cf0fd1ef34ca10d26d0"],
      },
      {
        author: "5ef66cf0fd1ef34ca10d26d5",
        body: "Chilling, grilling!",
        image:
          "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=668&q=80",
        likes: [
          "5ef66cf0fd1ef34ca10d26d5",
          "5ef66cf0fd1ef34ca10d26d2",
          "5ef66cf0fd1ef34ca10d26ce",
          "5ef66cf0fd1ef34ca10d26cf",
          "5ef66cf0fd1ef34ca10d26d0",
          "5ef66cf0fd1ef34ca10d26cd",
        ],
        shares: ["5ef66cf0fd1ef34ca10d26d0"],
      },
    ],
  },
];

seeder.connect(db, function () {
  seeder.loadModels(["../models/post.js"]);
  seeder.clearModels(["Post"], function () {
    seeder.populateModels(posts, function (err, done) {
      if (err) {
        return console.log("seed err", err);
      }
      if (done) {
        return console.log("seed done", done);
      }
      seeder.disconnect();
    });
  });
});
