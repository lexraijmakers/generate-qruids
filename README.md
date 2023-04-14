# QRUID Generator

A Node.js application to generate unique IDs.

## Installation

1. Clone the repository to your local machine
2. Install dependencies with `yarn install`

## Usage

To generate a CSV file with a specified number of unique IDs, run the following command:

```sh
yarn start
```

Variables:

-   `<numIds>` is the number of unique IDs to generate
-   `<urlPrefix>` is a URL prefix to prepend to the unique ID, e.g. `https://example.com/`
-   `<willGenerateImages>` (optional) generate a set of QR images for testing purposes

## License

This project is licensed under the [MIT License](https://opensource.org/licenses/MIT).
