# FreeCodeCamp: Image Search Abstraction Layer

This is my image search API for [Free Code Camp's fourth API challenge](https://www.freecodecamp.com/challenges/image-search-abstraction-layer). The demo is available on [Heroku](https://fcc-api-is.herokuapp.com/)

## User Stories

- [x] I can get the image URLs, alt text and page urls for a set of images relating to a given search string.
- [x] I can paginate through the responses by adding a ?offset=20 parameter to the URL.
- [x] I can get a list of the most recently submitted search strings.

### API endpoints

| Method | Route | Description |
|:---:|:---| :---|
| GET | /recent/ | Get the most recent searches |
| GET | /search/:query | Get search results for query |
