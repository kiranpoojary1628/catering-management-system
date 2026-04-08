import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const FoodQuizCard = ({ quiz }) => {
  const navigate = useNavigate();

  const goToService = () => {
    navigate(`/service/${quiz.slug}`);
  };

  const goToBooking = (e) => {
    e.stopPropagation(); // prevent card click
    navigate(`/book/${quiz.slug}`);
  };

  return (
    <motion.div
      className="card"
      onClick={goToService}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.97 }}
      transition={{ type: "spring", stiffness: 250 }}
      style={{ cursor: "pointer" }}
    >
      <img src={quiz.image} alt={quiz.title} />

      <h3>{quiz.title}</h3>
      <p className="tagline">{quiz.tagline}</p>
      <p className="price">{quiz.price}</p>

      {/* Book Now → Booking page */}
      <motion.button
        onClick={goToBooking}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.9 }}
      >
        Book Now
      </motion.button>
    </motion.div>
  );
};

export default FoodQuizCard;