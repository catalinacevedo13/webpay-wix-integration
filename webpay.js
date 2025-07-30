const { WebpayPlus } = require("transbank-sdk");

WebpayPlus.configureForIntegration(
  "597055555532", // Código de comercio de prueba
  "579B532A7440BB0C9079DED94D31EA1615BACEB56610332264630D42D0A36B1C" // API Key de prueba
);

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).send("Method Not Allowed");

  const { amount, order, sessionId } = req.body;

  try {
    const response = await WebpayPlus.Transaction.create(
      order,
      sessionId,
      amount,
      "https://tu-sitio-wix.com/retorno-webpay"
    );

    res.json({
      url: response.url,
      token: response.token
    });
  } catch (error) {
    console.error("Error creando transacción:", error);
    res.status(500).send("Error al crear transacción");
  }
}
