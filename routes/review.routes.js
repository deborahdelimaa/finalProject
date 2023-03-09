const router = require("express").Router();

const Review = require("../models/Review.model");
const Product = require("../models/Product.model");

// Create
router.post("/review", async (req, res, next) => {
  const { creator, comment } = req.body;
  try {
    const review = await Review.create({ creator, comment });
    await Review.findByIdAndUpdate(Review, {
      $push: {
        review: review._id,
      },
    });
    res.json(review);
  } catch (error) {
    console.log(error);
    res.json(error);
  }
});

// Read (all)
router.get("/review", async (req, res, next) => {
  try {
    const review = await Review.find();
    res.json(review);
  } catch (error) {
    res.json(error);
  }
});

// Update
router.put("/review/:id", async (req, res, next) => {
  const { id } = req.params;
  const { creator, comment } = req.body;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    res.json("The provided Review id is not valid ");
  }
  try {
    const updatedReview = await Review.findByIdAndUpdate(
      id,
      { creator, comment },
      { new: true }
    );
    res.json(updatedReview);
  } catch (error) {
    res.json(error);
  }
});

//Delete
router.delete("/review/:id", async (req, res, next) => {
  const { id } = req.params;
  try {
    const review = await Review.findById(id);
    await Review.findByIdAndDelete(id);
    res.json({ message: `Review with the id ${id} deleted successfully` });
  } catch (error) {
    res.json(error);
  }
});

module.exports = router;
