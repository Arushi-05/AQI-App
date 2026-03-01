# AQI API

Backend system that retrieves Air Quality Index data and applies caching, rate limiting, and authentication.

## Tech Stack
Node.js
Express
Redis
REST API

## Features
Redis caching layer
Sliding window rate limiter
API key authentication
External API integration
Middleware architecture

## API Endpoint

GET /aqi/:place

Headers:
x-api-key: your-api-key
