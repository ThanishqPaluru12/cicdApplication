# CI/CD Calculator Application

This repository contains a simple Python calculator program, static web UI, and GitHub Actions workflows for CI/CD.

## Run locally

```bash
python calculator.py
```

## Web UI preview

This project now includes a static calculator UI that mirrors the same operations in
`calculator.py`:

- Addition
- Subtraction
- Multiplication
- Division (with divide-by-zero error handling)

Open `index.html` in a browser to test the interface.

## Run tests

```bash
python -m unittest discover -s tests -v
```

## CI Workflows

- `build.yml`: Runs build check, unit tests, and deployment jobs for Vercel and AWS.

## IAM implementation for AWS deployment

This project deploys static site files to S3 and then invalidates CloudFront.
To implement secure IAM for GitHub Actions, use OpenID Connect (OIDC) and least-privilege policies.

### 1) Create GitHub OIDC provider in AWS (one-time per account)

Use AWS Console or AWS CLI to create an IAM identity provider with:

- Provider URL: `https://token.actions.githubusercontent.com`
- Audience: `sts.amazonaws.com`

### 2) Create deploy role and attach trust policy

Use the template in `iam/github-oidc-trust-policy.json` and replace placeholders:

- `AWS_ACCOUNT_ID`
- `GITHUB_ORG`
- `GITHUB_REPO`
- Optional: adjust allowed branches in `sub` conditions

Then create role (example):

```bash
aws iam create-role \
	--role-name github-calculator-deploy-role \
	--assume-role-policy-document file://iam/github-oidc-trust-policy.json
```

### 3) Attach least-privilege deploy policy

Use `iam/github-deploy-policy.json` and replace placeholders:

- `AWS_ACCOUNT_ID`
- `S3_BUCKET_NAME`
- `CLOUDFRONT_DISTRIBUTION_ID`

Create and attach policy (example):

```bash
aws iam create-policy \
	--policy-name github-calculator-deploy-policy \
	--policy-document file://iam/github-deploy-policy.json

aws iam attach-role-policy \
	--role-name github-calculator-deploy-role \
	--policy-arn arn:aws:iam::AWS_ACCOUNT_ID:policy/github-calculator-deploy-policy
```

### 4) Configure GitHub repository secrets

Set the following repository secrets in GitHub:

- `AWS_REGION` (example: `us-east-1`)
- `AWS_ROLE_TO_ASSUME` (example: `arn:aws:iam::123456789012:role/github-calculator-deploy-role`)
- `AWS_S3_BUCKET` (example: `thanishq-calculator-app`)
- `AWS_CLOUDFRONT_DISTRIBUTION_ID` (example: `E3N363XTKO1ENZ`)
- Optional: `AWS_SITE_URL`

### 5) Trigger deployment

Push to `main` or run the workflow manually. The `deploy-aws` job assumes the IAM role using OIDC and deploys only:

- `index.html`
- `styles.css`
- `app.js`

This avoids long-lived AWS access keys in GitHub secrets and follows least privilege.
