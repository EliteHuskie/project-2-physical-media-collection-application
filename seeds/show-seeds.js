const { Show } = require("../models");

const showData = [
  {
    show_name: "Friends",
    seasons: 10,
    description:
      "Friends is a 90's Comedy TV show, based in Manhattan, about 6 friends who go through just about every life experience imaginable together; love, marriage, divorce, children, heartbreaks, fights, new jobs and job losses and all sorts of drama.",
  },
  {
    show_name: "Stranger Things",
    seasons: "4",
    description:
      "Set in the 1980s, the series centers around the residents of the fictional small town of Hawkins, Indiana, as they are plagued by a hostile alternate dimension known as the Upside Down, after a nearby human experimentation facility opens a gateway between it and the normal world.",
  },
];

const seedShows = () => Show.bulkCreate(showData);

module.exports = seedShows;
