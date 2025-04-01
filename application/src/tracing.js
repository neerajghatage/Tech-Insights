// tracing.js
const { NodeSDK } = require('@opentelemetry/sdk-node');
const { getNodeAutoInstrumentations } = require('@opentelemetry/auto-instrumentations-node');
const { JaegerExporter } = require('@opentelemetry/exporter-jaeger');
const { Resource } = require('@opentelemetry/resources');
const { resourceFromAttributes } = require('@opentelemetry/resources');
const { SemanticResourceAttributes } = require('@opentelemetry/semantic-conventions');
const { MongoDBInstrumentation } = require('@opentelemetry/instrumentation-mongodb');
const { diag, DiagConsoleLogger, DiagLogLevel } = require('@opentelemetry/api');
require('dotenv').config();

// Enable debug logging
diag.setLogger(new DiagConsoleLogger(), DiagLogLevel.DEBUG);

// Configure Jaeger exporter
const traceExporter = new JaegerExporter({
  endpoint: process.env.OTEL_EXPORTER_JAEGER_ENDPOINT || 'http://jaeger-collector.tracing.svc.cluster.local:14268/api/traces',
});


// Create resource using the static create method
const resource = resourceFromAttributes({
  [SemanticResourceAttributes.SERVICE_NAME]: process.env.OTEL_SERVICE_NAME || 'demo-app',
  [SemanticResourceAttributes.SERVICE_VERSION]: '1.0.0',
  [SemanticResourceAttributes.DEPLOYMENT_ENVIRONMENT]: process.env.NODE_ENV || 'development'
});

// Initialize SDK
const sdk = new NodeSDK({
  resource,
  traceExporter,
  instrumentations: [
    getNodeAutoInstrumentations(),
    new MongoDBInstrumentation({ enhancedDatabaseReporting: true }),
  ],
});

// Start the SDK (no Promise chain)
sdk.start();
console.log('✅ OpenTelemetry tracing initialized');

// Graceful shutdown handlers
process.on('SIGTERM', () => {
  sdk.shutdown()
    .then(() => console.log('🛑 OpenTelemetry SDK shut down'))
    .catch(error => console.error('❌ Error shutting down OpenTelemetry SDK:', error))
    .finally(() => process.exit(0));
});

process.on('SIGINT', () => {
  sdk.shutdown()
    .then(() => console.log('🛑 OpenTelemetry SDK shut down'))
    .catch(error => console.error('❌ Error shutting down OpenTelemetry SDK:', error))
    .finally(() => process.exit(0));
});

// Export the SDK for potential use in other modules
module.exports = sdk;
