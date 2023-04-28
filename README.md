# GitHub Actions Requests
This repository is meant to hold the setup for requesting actions to be used internally in [`paritytech`](https://github.com/paritytech) organization

# Process description
1. User creates a new issue in this repo
1. The review team gets a notification about the new issue (using this action: [issue-comment-tag](https://github.com/devops-actions/issue-comment-tag))
1. After manual review, the review team labels the issue with `security-check`
1. The workflow `Issue labeled security scan` is triggered. It will fork requested GHA to `paritytech-actions` org and execute several automated checks, enables [dependabot-alerts](https://docs.github.com/en/code-security/dependabot/dependabot-alerts/about-dependabot-alerts)
1. The results of all the checks are added back into the request issue
1. Info [dependabot-alerts](https://docs.github.com/en/code-security/dependabot/dependabot-alerts/about-dependabot-alerts) warnings, can be retrieved by labelling issue with `load-dependabot-alerts`. GitHub needs some time to create report after alerts enabled at step 4. Link to its findings will be posted to the issue
1. After reviewing the results and approving them, appropriate tags should be applied and GHA will become available for [`paritytech`](https://github.com/paritytech) organization

# Checks
Currently we run the following checks:
- Has the repo been setup with a CodeQL workflow?
- Has the repo been configured with Dependabot updates? 
- If we fork the repo and enable Dependabot, do we get Security Alerts? 
- If we fork the repo and enable CodeQL, do we get Security Alerts?
- If the action uses a container, we run a [Trivy](https://github.com/aquasecurity/trivy) scan and check the alerts.

# Configuration
For configuration of the workflows in this repository, we use the following secrets:

|Name|Example value|Description|
|---|---|---|
|ACTIONS_STEP_DEBUG|true|Get additional debugging logs in Actions|
|GH_TOKEN|ghp_*****************|GitHub Token with enough access to fork the repos into a specific org|


These are the secrets that it uses:
|Name|Example value|Description|
|---|---|---|
|PROJECT_ACCOUNT|paritytech-actions|Account name under which the project is linked to|
|PROJECT_NUMBER|1|The number of the project|
|PROJECT_TOKEN|ghp_*****************|A token with access to add issues to the project|
