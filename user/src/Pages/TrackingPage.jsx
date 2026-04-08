import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import bgVideo from "../assets/bg-video.mp4";

const steps = [
  {
    key: "accepted",
    label: "Order Accepted",
    icon: "📝"
  },
  {
    key: "packed",
    label: "Packed",
    icon: "📦"
  },
  {
    key: "out_for_delivery",
    label: "Out for Delivery",
    icon: "🚚"
  },
  {
    key: "delivered",
    label: "Delivered",
    icon: "✅"
  }
];

const TrackingPage = () => {

  const { id } = useParams();

  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {

    const load = async () => {

      try {

        const res = await fetch(
          `http://localhost:5000/api/delivery/order/${id}`
        );

        const data = await res.json();

        setOrder(data);

      } catch (err) {

        console.log(err);

      } finally {

        setLoading(false);

      }

    };

    load();

    const interval = setInterval(
      load,
      3000
    );

    return () =>
      clearInterval(interval);

  }, [id]);

  if (loading) {
    return (
      <h2 style={{ color: "white" }}>
        Loading order...
      </h2>
    );
  }

  if (!order) {
    return (
      <h2 style={{ color: "white" }}>
        Order not found
      </h2>
    );
  }

  const currentIndex =
    steps.findIndex(
      s => s.key === order.status
    );

  return (

    <div
      style={{
        position: "relative",
        minHeight: "100vh"
      }}
    >

      {/* VIDEO BACKGROUND */}

      <video
        autoPlay
        muted
        loop
        playsInline
        style={{
          position: "fixed",
          inset: 0,
          width: "100%",
          height: "100%",
          objectFit: "cover",
          zIndex: -2
        }}
      >
        <source
          src={bgVideo}
          type="video/mp4"
        />
      </video>

      {/* DARK OVERLAY */}

      <div
        style={{
          position: "fixed",
          inset: 0,
          background:
            "rgba(0,0,0,0.65)",
          zIndex: -1
        }}
      />

      <div
  className="container"
  style={{
    maxWidth: "900px",   // bigger card
    width: "95%",
    margin: "auto",
    paddingTop: "60px",
    paddingBottom: "60px"
  }}
>

        <h1
          style={{
            color: "#fff",
            textAlign: "center",
            marginBottom: "20px"
          }}
        >
          📦 Track Your Order
        </h1>

        {/* ORDER CARD */}

        <div
  style={{
    background: "rgba(255,255,255,0.12)",
    backdropFilter: "blur(14px)",
    padding: "36px",
    borderRadius: "22px",
    width: "100%",
    minHeight: "420px",
    boxShadow: "0 18px 45px rgba(0,0,0,0.45)",
    color: "#fff"
  }}
>

          {/* HEADER */}

          <div
            style={{
              marginBottom: "16px"
            }}
          >

            <h3>
              Order ID:
              {" "}
              {order.id}
            </h3>

            <p
              style={{
                marginTop: "6px",
                opacity: 0.9
              }}
            >
              {order.items?.join(", ")}
            </p>

            <p
              style={{
                fontSize: "14px",
                opacity: 0.7
              }}
            >
              📍 {order.customer?.address}
            </p>

          </div>

          {/* STATUS BADGE */}

          <div
            style={{
              marginBottom: "22px"
            }}
          >

            <span
              style={{
                background:
                  "#22c55e",
                padding:
                  "6px 14px",
                borderRadius:
                  "999px",
                fontWeight:
                  "600",
                fontSize:
                  "14px"
              }}
            >
              {order.status
                .replace(
                  /_/g,
                  " "
                )}
            </span>

          </div>

          {/* TIMELINE */}

          <div>

            {steps.map(
              (
                step,
                index
              ) => {

                const done =
                  index <=
                  currentIndex;

                const isLast =
                  index ===
                  steps.length - 1;

                return (

                  <div
                    key={
                      step.key
                    }
                    style={{
                      display:
                        "flex",
                      position:
                        "relative",
                      marginBottom:
                        isLast
                          ? "0"
                          : "30px"
                    }}
                  >

                    {/* LINE */}

                    {!isLast && (

                      <div
                        style={{
                          position:
                            "absolute",
                          left: "14px",
                          top: "28px",
                          width:
                            "2px",
                          height:
                            "40px",
                          background:
                            done
                              ? "#22c55e"
                              : "#666"
                        }}
                      />

                    )}

                    {/* DOT */}

                    <div
                      style={{
                        width:
                          "30px",
                        height:
                          "30px",
                        borderRadius:
                          "50%",
                        background:
                          done
                            ? "#22c55e"
                            : "#444",
                        display:
                          "flex",
                        alignItems:
                          "center",
                        justifyContent:
                          "center",
                        color:
                          "#fff",
                        fontSize:
                          "14px",
                        fontWeight:
                          "bold",
                        marginRight:
                          "14px",
                        boxShadow:
                          done
                            ? "0 0 0 4px rgba(34,197,94,0.25)"
                            : "none",
                        transition:
                          "0.3s"
                      }}
                    >

                      {
                        step.icon
                      }

                    </div>

                    {/* TEXT */}

                    <div>

                      <div
                        style={{
                          fontSize:
                            "17px",
                          fontWeight:
                            done
                              ? "600"
                              : "400",
                          color:
                            done
                              ? "#22c55e"
                              : "#ccc"
                        }}
                      >

                        {
                          step.label
                        }

                      </div>

                      <div
                        style={{
                          fontSize:
                            "13px",
                          opacity:
                            0.7
                        }}
                      >

                        {done
                          ? "Completed"
                          : "Pending"}

                      </div>

                    </div>

                  </div>

                );

              }
            )}

          </div>

        </div>

      </div>

    </div>

  );

};

export default TrackingPage;