import { Review } from "../models/review.js";
import { User } from "../models/user.js";

export async function createReview(req, res) {
  try {
    const { rating, message } = req.body;
    const userId = req.user.id;

    const user = await User.findById(userId);

    const review = await Review.create({
      user: {
        id: user._id,
        email: user.email,
      },
      rating,
      message,
    });

    res.status(201).json(review);
  } catch (error) {
    console.error(error);
    res.status(500).send("Erro ao criar avaliação da loja");
  }
}
