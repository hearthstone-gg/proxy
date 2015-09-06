

#!/bin/bash

set -o errexit # Exit on error

pm2 start pm2.json
sudo node index.js