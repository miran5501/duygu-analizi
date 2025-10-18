import "../styles/MesajKart.css";

const MesajKart = ({ mesaj }) => {
  const { text, duyguDurumu, duyguYuzdesi, tarih } = mesaj;

  /* gelen tarih formatını düzgün göstermek için dönüşüm */
  const formatDate = (isoString) => {
    if (!isoString) return "";
    const date = new Date(isoString);
    return date.toLocaleString("tr-TR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div className="mesaj-kart">
      {/* duygu bilgisinin olduğu taraf */}
      <div className="mesaj-sol">
        <p className="duygu">{duyguDurumu}</p>
        <p className="yuzde">%{duyguYuzdesi}</p>
      </div>

      {/* Mesaj metni ve tarihin olduğu taraf */}
      <div className="mesaj-sag">
        <p className="icerik">{text}</p>
        <span className="tarih">{formatDate(tarih)}</span>
      </div>
    </div>
  );
};

export default MesajKart;
