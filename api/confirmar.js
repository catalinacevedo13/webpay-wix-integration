const { WebpayPlus } = require("transbank-sdk");

WebpayPlus.configureForIntegration(
  "597055555532",
  "579B532A7440BB0C9079DED94D31EA1615BACEB56610332264630D42D0A36B1C"
);

export default async function handler(req, res) {
  const { token_ws } = req.query;

  try {
    const result = await WebpayPlus.Transaction.commit(token_ws);

    if (result.status === "AUTHORIZED") {
      res.redirect("https://tu-sitio-wix.com/exito");
    } else {
      res.redirect("https://tu-sitio-wix.com/error");
    }
  } catch (error) {
    console.error("Error al confirmar transacción:", error);
    res.redirect("https://tu-sitio-wix.com/error");
  }
}
