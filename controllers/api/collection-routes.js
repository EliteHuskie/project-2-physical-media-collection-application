const router = require("express").Router();
const {
  User,
  Collection,
  Movie,
  Book,
  Show,
  MovieCollection,
  BookCollection,
  ShowCollection,
} = require("../../models");

// GET all of a user's collections
router.get("/", async (req, res) => {
  const userId = await User.findOne({
    where: {
      username: req.session.username,
    },
  });
  try {
    // get collections with included media information
    const dbCollectionData = await Collection.findAll({
      where: {
        user_id: userId.dataValues.id,
      },
      include: [{ model: Movie }, { model: Book }, { model: Show }],
    });

    if (!dbCollectionData) {
      res.status(404).json({
        message:
          "You have no collections. Create a new collection by using the dropdown in the navigation.",
      });
    }

    res.status(200).json(dbCollectionData);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
});

// GET a collection by id
router.get("/:id", async (req, res) => {
  try {
    // get collection with included media information
    const dbCollectionData = await Collection.findByPk(req.params.id, {
      include: [{ model: Movie }, { model: Book }, { model: Show }],
    });

    if (!dbCollectionData) {
      res
        .status(404)
        .json({ message: `No collection found with id: ${req.params.id}` });
    }

    res.status(200).json(dbCollectionData);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
});

// POST a new collection
router.post("/", async (req, res) => {
  const userId = await User.findOne({
    where: {
      username: req.session.username,
    },
  });
  Collection.create({
    collection_name: req.body.collection_name,
    user_id: userId.dataValues.id,
  })
    .then((collection) => {
      let movieCollectionArr;
      let movieCollectionIds;

      let showCollectionArr;
      let showCollectionIds;

      let bookCollectionArr;
      let bookCollectionIds;

      // if any movies/shows/books, create pairings
      if (req.body.mediaIds) {
        // if movies, create movie pairings
        if (req.body.mediaIds.movieIds) {
          movieCollectionArr = req.body.mediaIds.movieIds.map((movie_id) => {
            return {
              movie_id,
              collection_id: collection.id,
            };
          });
          movieCollectionIds = MovieCollection.bulkCreate(movieCollectionArr);
        }
        // if shows, create show pairings
        if (req.body.mediaIds.showIds) {
          showCollectionArr = req.body.mediaIds.showIds.map((show_id) => {
            return {
              show_id,
              collection_id: collection.id,
            };
          });
          showCollectionIds = ShowCollection.bulkCreate(showCollectionArr);
        }
        // if books, create book pairings
        if (req.body.mediaIds.bookIds) {
          bookCollectionArr = req.body.mediaIds.bookIds.map((book_id) => {
            return {
              book_id,
              collection_id: collection.id,
            };
          });
          bookCollectionIds = BookCollection.bulkCreate(bookCollectionArr);
        }

        return { movieCollectionIds, showCollectionIds, bookCollectionIds };
      }

      res.status(200).json(collection);
    })
    .then((mediaCollectionIds) => res.status(200).json(mediaCollectionIds))
    .catch((error) => {
      console.log(error);
      res.status(400).json(error);
    });
});

// PUT collection updates
router.put("/:id", async (req, res) => {
  Collection.update(req.body, {
    where: {
      id: req.params.id,
    },
  })
    .then(async (collection) => {
      // if movies/shows/books are added or removed, update ids associated to collection
      if (req.body.mediaIds) {
        // if new movie ids, change MovieCollection associations
        if (req.body.mediaIds.movieIds) {
          MovieCollection.findAll({
            where: {
              collection_id: req.params.id,
            },
          }).then((movieCollections) => {
            // filter list of new movie_ids
            const movieCollectionIds = movieCollections.map(
              ({ movie_id }) => movie_id
            );
            const newMovieCollections = req.body.mediaIds.movieIds
              .filter((movie_id) => !movieCollectionIds.includes(movie_id))
              .map((movie_id) => {
                return {
                  movie_id,
                  collection_id: req.params.id,
                };
              });

            // figure out which ones to remove
            const movieCollectionsToRemove = movieCollections
              .filter(
                ({ movie_id }) => !req.body.mediaIds.movieIds.includes(movie_id)
              )
              .map(({ id }) => id);
            // run both actions
            return Promise.all([
              MovieCollection.destroy({
                where: { id: movieCollectionsToRemove },
              }),
              MovieCollection.bulkCreate(newMovieCollections),
            ]);
          });
        }
        // if new show ids, change ShowCollection associations
        if (req.body.mediaIds.showIds) {
          ShowCollection.findAll({
            where: {
              collection_id: req.params.id,
            },
          }).then((showCollections) => {
            // filter list of new movie_ids
            const showCollectionIds = showCollections.map(
              ({ show_id }) => show_id
            );
            const newShowCollections = req.body.mediaIds.showIds
              .filter((show_id) => !showCollectionIds.includes(show_id))
              .map((show_id) => {
                return {
                  show_id,
                  collection_id: req.params.id,
                };
              });

            // figure out which ones to remove
            const showCollectionsToRemove = showCollections
              .filter(
                ({ show_id }) => !req.body.mediaIds.showIds.includes(show_id)
              )
              .map(({ id }) => id);
            // run both actions
            return Promise.all([
              ShowCollection.destroy({
                where: { id: showCollectionsToRemove },
              }),
              ShowCollection.bulkCreate(newShowCollections),
            ]);
          });
        }
        // if new book ids, change BookCollection associations
        if (req.body.mediaIds.bookIds) {
          BookCollection.findAll({
            where: {
              collection_id: req.params.id,
            },
          }).then((bookCollections) => {
            // filter list of new movie_ids
            const bookCollectionIds = bookCollections.map(
              ({ book_id }) => book_id
            );
            const newBookCollections = req.body.mediaIds.bookIds
              .filter((book_id) => !bookCollectionIds.includes(book_id))
              .map((book_id) => {
                return {
                  book_id,
                  collection_id: req.params.id,
                };
              });

            // figure out which ones to remove
            const bookCollectionsToRemove = bookCollections
              .filter(
                ({ book_id }) => !req.body.mediaIds.bookIds.includes(book_id)
              )
              .map(({ id }) => id);
            // run both actions
            return Promise.all([
              BookCollection.destroy({
                where: { id: bookCollectionsToRemove },
              }),
              BookCollection.bulkCreate(newBookCollections),
            ]);
          });
        }
      }

      return res.status(200).json(collection);
    })
    .catch((error) => {
      console.log(error);
      res.status(400).json(error);
    });
});

// DELETE a collection
router.delete("/:id", async (req, res) => {
  try {
    const dbCollectionData = await Collection.destroy({
      where: {
        id: req.params.id,
      },
    });

    if (!dbCollectionData) {
      res
        .status(404)
        .json({ message: `No collection found with id: ${req.params.id}` });
    }

    res.status(200).json(dbCollectionData);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
});

module.exports = router;
