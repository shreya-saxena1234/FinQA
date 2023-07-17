class Logger {
  logRequest(req, res, next) {
    const { method, originalUrl, ip } = req;
    const timestamp = new Date().toISOString();

    console.log(
      `🚀 [${timestamp}] Request: ${method} ${originalUrl} - IP: ${ip}`
    );

    next();
  }

  logError(err, req, res, next) {
    const timestamp = new Date().toISOString();

    console.error(`❌ [${timestamp}] Error: ${err}`);

    next(err);
  }
}

module.exports = Logger;
