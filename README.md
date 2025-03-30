# Autocomplete Component

A production-"ready", accessible, and performant autocomplete component built with React and TypeScript.

## Features

- Real-time search with debounced API calls
- Full keyboard navigation support
- ARIA-compliant for accessibility
- Highlighted search matches
- Responsive design
- Fully typed with TypeScript

## Installation

1. Clone the repository: ```git clone https://github.com/HydroxZ/autocomplete_casavo.git```
2. Open the folder: ```cd autocomplete_casavo```
3. Install dependencies: ```npm install```
4. Run the development server: ```npm start```

## Usage notes

According to this point in the requirements:
> 4. The function to filter the data should be asynchronous. You can use mock data (such as a JSON array), but the function which uses it should be asynchronous (similar to a real REST call).

The Autocomplete component doesn't have any built-in filtering functionality. It relies entirely on the `fetchSuggestions` prop function to handle data filtering.
