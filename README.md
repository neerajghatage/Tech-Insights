# Tech-Insights

## Problem Statement

Debugging complex systems often becomes a bottleneck due to slow, repetitive, and manual processes. These challenges are exacerbated by inconsistent troubleshooting methods, reliance on a few experienced engineers, and outdated logs that lack actionable insights. This project aims to implement a robust observability solution to simplify debugging, enhance visibility into system health, and enable faster issue resolution.


## Tech Stack

### Core Application
- **Backend**: Node.js with Express
- **Database**: MongoDB
- **Containerization**: Docker

### Observability Tools
- **Metrics**: Prometheus, Node Exporter, Custom Metrics
- **Logging**: EFK Stack (Elasticsearch, Fluentbit, Kibana)
- **Tracing**: OpenTelemetry SDK, Jaeger
- **Alerting**: Prometheus AlertManager (with email notifications)
- **Visualization**: Grafana, Kibana, Jaeger UI, AlertManager UI
- **Storage**: Azure Disk Storage (for persistent Elasticsearch data)

### Infrastructure & Deployment
- **Orchestration**: Azure Kubernetes Service (AKS)
- **CI/CD**: GitHub Actions, ArgoCD  [ArgoCD implementation is currently underway]
- **Authentication**: Azure Managed Identity


## Flow Diagrams

- System Architecture

![HLD_Diagram](https://github.com/user-attachments/assets/a8f70f6a-a6a1-4d22-969f-6e2be9ed2cfe)

- Backend:API Requests Traversal Flowchart

![API_Request_Traversal_flowchart](https://github.com/user-attachments/assets/6ffea044-098e-4df5-9525-12c49035b0ce)

- Backend:Observabilty Flowchart

![Backend-Observability](https://github.com/user-attachments/assets/998a5371-e5e2-4f85-9a0e-c20ed397e6f3)



## Features of the Project

1. **Comprehensive Metrics Collection**
   - System-level metrics via Node Exporter.
   - Kubernetes cluster metrics via kube-state-metrics.
   - Implementation of Custom application metrics

2. **Centralized Logging**
   - Fluentbit for log collection and filtering of unimportant logs.
   - Elasticsearch for scalable log storage and indexing.
   - Kibana for log visualization and analysis.

3. **Distributed Tracing**
   - OpenTelemetry SDK for tracing API calls and database queries.
   - Jaeger for end-to-end trace visualization and bottleneck identification.

4. **Alerting System**
   - Prometheus AlertManager configured with custom alerting rules.
   - Email notifications triggered when specific conditions are met.
   - AlertManager UI for managing and monitoring alerts.

5. **Persistent Data Storage**
   - Azure Disk Storage ensures logs and traces are retained even after pod restarts or failures.

6. **Secure Communication**
   - Azure Managed Identity ensures secure communication between services (e.g., Elasticsearch).

7. **CI/CD Pipeline**
   - Automated builds and deployments using GitHub Actions and ArgoCD.

8. **Scalable Architecture**
   - Designed to handle large-scale applications with Kubernetes orchestration.

9. **Custom Dashboards**
   - Grafana dashboards for metrics visualization.
   - Jaeger UI for trace analysis.
   - Kibana dashboards for log exploration.


## Limitations and Future Work

1. The current implementation focuses on backend observability; frontend monitoring could be added in the future to improve visibility into user experience.
2. The system primarily targets technical metrics; business metrics could be incorporated to align with organizational goals.
3. Machine learning for anomaly detection is not included in this version but could enhance proactive issue detection in the future.
4. Cost optimization for storage and retention policies needs further refinement to reduce operational expenses without compromising data availability.
5. Changing observability tools is challenging as it would require significant changes to the source code due to the use of custom metrics specific to the current tools.


## Getting Started

### Prerequisites
- An Azure subscription with AKS enabled.
- Docker installed locally.
- Kubernetes CLI tools (`kubectl`) installed.
- Helm installed for package management.
- GitHub account for CI/CD integration.

### Deployment Steps

1. **Clone the Repository**

2. **Build the Docker Image**

3. **Deploy to AKS**
- Use Helm charts or Kubernetes YAML manifests to deploy the application, Prometheus, Grafana, EFK stack, Jaeger, and AlertManager.

4. **Set Up Prometheus and Grafana**
- Install Prometheus using Helm:
  ```
  helm install prometheus prometheus-community/prometheus
  ```
- Install Grafana:
  ```
  helm install grafana grafana/grafana
  ```

5. **Set Up EFK Stack**
- Deploy Elasticsearch using Helm or manifests.
- Configure Fluentbit to collect logs from application pods.
- Deploy Kibana for log visualization.

6. **Set Up Jaeger**
- Deploy Jaeger Agent, Collector, Query UI, and Elasticsearch as the storage backend.

7. **Set Up AlertManager**
- Define custom alerting rules in Prometheus configuration files.
- Configure AlertManager to send email notifications when alerts are triggered.
- Access the AlertManager UI at `<alertmanager-ui-url>`.

8. **Access Dashboards**
- Grafana: Monitor metrics at `<grafana-url>`.
- Kibana: Explore logs at `<kibana-url>`.
- Jaeger UI: Analyze traces at `<jaeger-ui-url>`.

## Demonstration

📽️ **Demonstration Video**: [Watch the video here](https://drive.google.com/file/d/11Vz3GoP9Uohnp5qNxd1xmfuP6Nh_9dn7/view?usp=drive_link)  
📄 **Documentation** *(HLD decisions, tradeoffs, known gaps)*: [Read the doc](https://drive.google.com/file/d/1jAPprANOwOXKC0ezIMSHoVfRis0ZnZW9/view?usp=drive_link)


## Contribution Guidelines

Contributions are welcome to improve this observability implementation further. Please follow the standard pull request process and ensure that any changes include updates to metrics, logs, traces, or alerting configurations as necessary.


## License

This project is licensed under the MIT License.
