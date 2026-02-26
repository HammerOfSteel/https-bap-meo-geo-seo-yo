#!/bin/bash
# This script is run by PostgreSQL when starting
# Create the database if it doesn't exist

set -e

DATABASE="$POSTGRES_DB"
USER="$POSTGRES_USER"

# Check if database exists, if not create it
psql -U "$USER" <<-EOSQL
SELECT 'OK' FROM pg_database WHERE datname = '$DATABASE';
EOSQL

if [ $? -ne 0 ]; then
  echo "Creating database: $DATABASE"
  psql -U "$USER" -c "CREATE DATABASE $DATABASE;"
  echo "Database created successfully"
fi
