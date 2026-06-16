# CI/CD Calculator Application

This repository contains a simple Python calculator program and GitHub Actions workflows.

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

- `ci.yml`: Runs tests on push and pull requests.
- `quality-checks.yml`: Compiles Python files to ensure there are no syntax errors.
