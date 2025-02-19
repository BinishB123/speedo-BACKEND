const STATUS_CODES = {
    SUCCESS: {
      OK: 200, // Request was successful.
      CREATED: 201, // Resource successfully created.
      ACCEPTED: 202, // Request accepted but processing is not complete.
      NO_CONTENT: 204, // Request successful, but no response body.
    },
  
    REDIRECTION: {
      MOVED_PERMANENTLY: 301, // Resource has been moved permanently to a new URL.
      FOUND: 302, // Resource is temporarily available at a different URL.
      NOT_MODIFIED: 304, // Cached version is still valid; no need to resend data.
    },
  
    CLIENT_ERROR: {
      BAD_REQUEST: 400, // Invalid request (e.g., missing parameters, invalid JSON).
      UNAUTHORIZED: 401, // Authentication required (e.g., missing/invalid token).
      FORBIDDEN: 403, // User authenticated but lacks permission.
      NOT_FOUND: 404, // Resource not found.
      METHOD_NOT_ALLOWED: 405, // HTTP method (GET, POST, etc.) not allowed for this endpoint.
      CONFLICT: 409, // Conflict with the current state of the resource (e.g., duplicate entry).
      GONE: 410, // Resource no longer available.
      PAYLOAD_TOO_LARGE: 413, // Request body is too large.
      UNSUPPORTED_MEDIA_TYPE: 415, // Media format not supported (e.g., expecting JSON but received XML).
      UNPROCESSABLE_ENTITY: 422, // Validation error (e.g., invalid input fields).
      TOO_MANY_REQUESTS: 429, // Rate limit exceeded.
    },
  
    SERVER_ERROR: {
      INTERNAL_SERVER_ERROR: 500, // Generic server error.
      NOT_IMPLEMENTED: 501, // API endpoint/method not implemented.
      BAD_GATEWAY: 502, // Server received an invalid response from an upstream server.
      SERVICE_UNAVAILABLE: 503, // Server is down or overloaded.
      GATEWAY_TIMEOUT: 504, // Server took too long to respond.
      INSUFFICIENT_STORAGE: 507, // Server storage limit exceeded.
    },
  };
  
  export default STATUS_CODES;
  