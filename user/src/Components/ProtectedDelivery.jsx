import { Navigate } from "react-router-dom";
import { useEffect, useState } from "react";

const ProtectedDelivery = ({ children }) => {

  const [allowed, setAllowed] = useState(null);

  useEffect(() => {

    const checkAccess = async () => {

      try {
        const user = JSON.parse(
          localStorage.getItem("loggedInUser")
        );

        if (!user) {
          setAllowed(false);
          return;
        }

        const res = await fetch(
          "http://localhost:5000/api/admin/config"
        );

        const data = await res.json();

        const deliveryEmail =
          data.deliveryEmail
            ?.toLowerCase()
            .trim();

        const userEmail =
          user.email
            ?.toLowerCase()
            .trim();

        setAllowed(
          userEmail === deliveryEmail
        );

      } catch (err) {

        console.warn(
          "Delivery access check failed",err
        );

        setAllowed(false);

      }

    };

    checkAccess();

  }, []);

  if (allowed === null)
    return (
      <h2>
        Checking access...
      </h2>
    );

  if (!allowed)
    return <Navigate to="/" />;

  return children;

};

export default ProtectedDelivery;