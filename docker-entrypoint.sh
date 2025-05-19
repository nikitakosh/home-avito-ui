#!/bin/sh

# Create config.js with the API URL from environment variable
cat > /usr/share/nginx/html/config.js << EOF
window.APP_CONFIG = {
  API_BASE_URL: "${API_BASE_URL:-http://localhost:8080}"
};
EOF

# Execute the main command
exec "$@" 