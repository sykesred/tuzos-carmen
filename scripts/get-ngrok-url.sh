#!/usr/bin/env bash
# ─────────────────────────────────────────────────────────────────────────────
# get-ngrok-url.sh
# Muestra la URL pública de ngrok y los webhooks listos para pegar en Twilio.
# Uso: ./scripts/get-ngrok-url.sh
# ─────────────────────────────────────────────────────────────────────────────

set -euo pipefail

NGROK_API="http://localhost:4040/api/tunnels"

echo ""
echo "Esperando que ngrok levante el túnel..."

# Reintentar hasta 15 veces (espera ~15 segundos)
for i in $(seq 1 15); do
  RESPONSE=$(curl -sf "$NGROK_API" 2>/dev/null || echo "")
  if [ -n "$RESPONSE" ]; then
    break
  fi
  sleep 1
done

if [ -z "$RESPONSE" ]; then
  echo "ERROR: No se pudo conectar al inspector de ngrok en $NGROK_API"
  echo "Asegúrate de que el contenedor 'tuzos-ngrok' esté corriendo."
  exit 1
fi

# Extraer la URL pública HTTPS
PUBLIC_URL=$(echo "$RESPONSE" | grep -o '"public_url":"https://[^"]*"' | head -1 | cut -d'"' -f4)

if [ -z "$PUBLIC_URL" ]; then
  echo "ERROR: No se encontró ningún túnel HTTPS activo."
  exit 1
fi

echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "  URL pública ngrok:  $PUBLIC_URL"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""
echo "  Pega estos webhooks en la consola de Twilio:"
echo ""
echo "  SMS entrante:   $PUBLIC_URL/api/webhook/sms"
echo "  Voz entrante:   $PUBLIC_URL/api/webhook/voice"
echo "  Status:         $PUBLIC_URL/api/webhook/status"
echo ""
echo "  Inspector ngrok (requests en vivo): http://localhost:4040"
echo ""
