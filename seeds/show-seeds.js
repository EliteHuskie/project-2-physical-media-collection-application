const { Show } = require("../models");

const showData = [
  {
    show_name: "Friends",
    seasons: 10,
    description:
      "Friends is a 90's Comedy TV show, based in Manhattan, about 6 friends who go through just about every life experience imaginable together; love, marriage, divorce, children, heartbreaks, fights, new jobs and job losses and all sorts of drama.",
  },
];

const seedShows = () => Show.bulkCreate(showData);

module.exports = seedShows;
